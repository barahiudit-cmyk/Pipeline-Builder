# Pipeline Builder

A drag-and-drop visual pipeline builder for composing typed nodes,
connecting them with edges, and validating the resulting graph structure.

Built to explore React Flow patterns, custom component abstractions, and
graph algorithms.


## Setup

### Prerequisites

- Node.js 16+ and npm
- Python 3.9+
- pip

### Backend

    cd backend
    pip install -r requirements.txt
    python -m uvicorn main:app --reload

Runs on http://localhost:8000. Interactive API docs at http://localhost:8000/docs.

### Frontend

    cd frontend
    npm install
    npm start

Runs on http://localhost:3000.

Open the frontend URL in your browser. The backend must be running for the
Submit button to work.


## Stack

- Frontend: React, ReactFlow, Zustand, Tailwind CSS, Lucide icons
- Backend: Python, FastAPI, Pydantic


## Project structure

    backend/
        main.py
        requirements.txt

    frontend/
        src/
            components/
                layouts/
                    Canvas.js
                    Header.js
                    Sidebar.js
                BaseNode.js
                draggableNode.js
                EmptyCanvas.js
                PipelineCanvas.js
                ResultModal.js
                SubmitButton.js
                ZoomControl.js
            hooks/
                useTheme.js
            nodes/
                apiNode.js
                conditionalNode.js
                delayNode.js
                emailNode.js
                filterNode.js
                inputNode.js
                llmNode.js
                mathNode.js
                outputNode.js
                textNode.js
                webhookNode.js
            utils/
                nodeColors.js
                nodeRegistry.js
            App.js
            index.css
            index.js
            store.js


## Available nodes

- Input - pipeline entry point
- Output - pipeline exit point
- LLM - language model with a model selector
- Text - multi-line text with {{variable}} parsing
- Filter - condition + value
- Math - two inputs, one operation
- API - HTTP request config (method, url, timeout)
- Delay - numeric delay in ms
- Conditional - one input, two outputs (true / false)
- Email - to, subject, body
- Webhook - url, method


## Keyboard shortcuts

- Ctrl+Z / Cmd+Z - undo
- Ctrl+Y / Cmd+Shift+Z - redo
- Escape - close mobile sidebar


## Notes on the implementation

### Node abstraction

All node types share the same structural pattern - a card with a header,
some fields, and one or more handles. Instead of duplicating that markup
across every file, there is a single BaseNode component that takes a config:

    <BaseNode
      id={id}
      data={data}
      type="customInput"
      title="Input"
      fields={[...]}
      handles={[...]}
    />

Each specific node ends up being around 15 lines instead of 40+. BaseNode
also writes field changes directly to the Zustand store via updateNodeField,
so every node automatically syncs to global state without each one needing
to wire up its own state management.

There is a children prop on BaseNode for nodes that need custom rendering
(like the Text node), so the abstraction doesn't get in the way when
something is genuinely different.

### Text node

Two behaviours:

1. The textarea grows with the content. A useEffect resets the height to
   auto and then sets it to scrollHeight whenever the text changes, so it
   both grows and shrinks.

2. Any {{ name }} pattern in the text becomes a Handle on the left side of
   the node. A regex finds the matches, each name is checked against the
   JavaScript identifier rule, a Set dedupes duplicates, and the result is
   memoised on the text value so it doesn't recompute on every render.
   Invalid names like {{ 123 }} or {{ user-name }} are ignored.

### Backend

The /pipelines/parse endpoint accepts a JSON body with nodes and edges and
returns { num_nodes, num_edges, is_dag }.

DAG detection uses Kahn's algorithm:
- build an adjacency list and an in-degree count per node
- queue all nodes with in-degree 0
- pop a node, decrement its neighbours' in-degree, queue any that hit 0
- if all nodes are processed, the graph is a DAG; otherwise there's a cycle

Runs in O(V + E) and handles disconnected components without extra logic.

CORS is enabled only for http://localhost:3000 rather than wildcarded.
Pydantic models use extra="allow" so the extra fields ReactFlow attaches
to nodes/edges (position, data, etc.) don't break validation.

### Submit flow

The Submit button pulls live nodes and edges from the Zustand store and
POSTs them as JSON. It guards against empty pipelines, shows a loading
state on the button, handles both network failures and non-2xx responses,
and shows the result in a custom modal with the counts and a DAG verdict.

### Centralised colors

All node colors live in src/utils/nodeColors.js as a single registry. Helper
functions return the right format for each consumer - Tailwind gradient
classes for node headers, hex codes for the minimap, and Tailwind text
utilities for sidebar icons. Changing a node's color is a one-line edit
that updates everywhere automatically.

### Undo / redo

The store keeps a past and a future stack. Structural changes (adding nodes,
removing them, connecting edges) push a snapshot of the previous state onto
past before applying. Undo pops from past and pushes current state onto
future; redo does the inverse. Capped at 50 entries.

Field edits and node-drag events are deliberately excluded - those would
spam the stack with hundreds of entries per session.

Ctrl+Z / Ctrl+Y work, and the buttons are disabled when their stack is
empty.

### Theme

A small useTheme hook holds the current theme, persists it to localStorage,
and toggles a dark class on the html element. Tailwind's darkMode: 'class'
config handles the colour switching.

### Mobile

Below the lg breakpoint the sidebar is hidden and slides in from the left
when the hamburger button is tapped. Tap the backdrop or press Escape to
close. On mobile, tapping a sidebar node adds it directly to the canvas
center instead of using drag-and-drop, which doesn't work well on touch
devices. The sidebar also auto-closes after a node is added.


## Things to add later

- Save/load pipelines to localStorage or a backend collection
- Per-node validation (e.g. warn on disconnected required handles)
- Unit tests for is_dag and the variable extraction regex
- Click-and-drag from a handle to create a connected node in one step