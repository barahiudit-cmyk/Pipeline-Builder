from collections import defaultdict, deque
from typing import List, Dict, Any

from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel


app = FastAPI()

# allow the react dev server to call us
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


# ---------- request models ----------
class NodeModel(BaseModel):
    id: str
    # we don't care about the rest for parsing, but allow it through
    class Config:
        extra = "allow"


class EdgeModel(BaseModel):
    source: str
    target: str
    class Config:
        extra = "allow"


class PipelinePayload(BaseModel):
    nodes: List[NodeModel]
    edges: List[EdgeModel]


# ---------- helpers ----------
def is_dag(nodes: List[NodeModel], edges: List[EdgeModel]) -> bool:
    """Kahn's algorithm - returns True if graph has no cycles."""
    node_ids = {n.id for n in nodes}
    in_degree: Dict[str, int] = defaultdict(int)
    adj: Dict[str, List[str]] = defaultdict(list)

    for n in nodes:
        in_degree[n.id] = 0

    for e in edges:
        # skip edges that reference unknown nodes
        if e.source not in node_ids or e.target not in node_ids:
            continue
        adj[e.source].append(e.target)
        in_degree[e.target] += 1

    queue = deque([nid for nid, deg in in_degree.items() if deg == 0])
    processed = 0

    while queue:
        node = queue.popleft()
        processed += 1
        for nbr in adj[node]:
            in_degree[nbr] -= 1
            if in_degree[nbr] == 0:
                queue.append(nbr)

    return processed == len(node_ids)


# ---------- routes ----------
@app.get("/")
def read_root():
    return {"Ping": "Pong"}


@app.post("/pipelines/parse")
def parse_pipeline(payload: PipelinePayload) -> Dict[str, Any]:
    return {
        "num_nodes": len(payload.nodes),
        "num_edges": len(payload.edges),
        "is_dag": is_dag(payload.nodes, payload.edges),
    }