const flowConfig = {
  "id": "a744ec33-dbf4-4ebf-8c9d-58e6cfb0c7e1",
  "name": "GDrive",
  "nodes": [
    {
      "id": "triggerNode_1",
      "data": {
        "modes": {
          "folderUrl": "list"
        },
        "nodeId": "googleDriveNode",
        "values": {
          "nodeName": "Google Drive",
          "syncMode": "incremental_append",
          "folderUrl": "https://drive.google.com/drive/folders/14B2dF8V27EhyqGoawj44mYsXtVy2cLLx",
          "credentials": "Google Drive OAuth",
          "cronExpression": "0 0 00 ? * 1 * UTC"
        },
        "trigger": true
      },
      "type": "triggerNode",
      "position": {
        "x": 0,
        "y": 0
      }
    },
    {
      "id": "chunkNode_934",
      "data": {
        "nodeId": "chunkNode",
        "values": {
          "nodeName": "chunking",
          "chunkField": "{{triggerNode_1.output.content}}",
          "numOfChars": 500,
          "separators": [
            "\\n\\n",
            "\\n",
            " "
          ],
          "chunkingType": "recursiveCharacterTextSplitter",
          "overlapChars": 50
        }
      },
      "type": "dynamicNode",
      "position": {
        "x": 0,
        "y": 0
      }
    },
    {
      "id": "codeNode_539",
      "data": {
        "nodeId": "codeNode",
        "values": {
          "code": "let docs =  {{chunkNode_934.output.chunks}};\n\nlet outputDocs = docs.map(doc => doc.pageContent);\n\noutput = outputDocs;",
          "nodeName": "Extract Chunked Text"
        }
      },
      "type": "dynamicNode",
      "position": {
        "x": 0,
        "y": 0
      }
    },
    {
      "id": "vectorizeNode_623",
      "data": {
        "nodeId": "vectorizeNode",
        "values": {
          "nodeName": "Get Vectors",
          "inputText": "{{codeNode_539.output}}",
          "embeddingModelName": {
            "type": "embedder/text",
            "params": {},
            "model_name": "gemini/gemini-embedding-001(3072)",
            "credentialId": "caf2ada4-a11f-4991-93ce-29508076cab6",
            "provider_name": "gemini",
            "credential_name": "Test_lamatic"
          }
        }
      },
      "type": "dynamicNode",
      "position": {
        "x": 0,
        "y": 0
      }
    },
    {
      "id": "codeNode_560",
      "data": {
        "nodeId": "codeNode",
        "values": {
          "code": "let vectors = {{vectorizeNode_623.output.vectors}};\nlet metadataProps = [];\nlet texts = {{codeNode_539.output}};\n\nfor (const idx in vectors) {\n    let metadata = {}\n    metadata[\"title\"] = {{variablesNode_272.output.title}};\n    metadata[\"content\"] = texts[idx];\n    metadata[\"source\"] = {{variablesNode_272.output.source}};\n    metadataProps.push(metadata);\n}\n\n\noutput = {\"metadata\": metadataProps, \"vectors\": vectors}",
          "nodeName": "Transform Metadata"
        }
      },
      "type": "dynamicNode",
      "position": {
        "x": 0,
        "y": 0
      }
    },
    {
      "id": "IndexNode_343",
      "data": {
        "nodeId": "IndexNode",
        "values": {
          "nodeName": "Index to DB",
          "vectorDB": "VectorDB8977",
          "webhookURL": "https://webhook.site/685a66e7-b4d3-40a4-9801-99e3460414f9",
          "primaryKeys": [
            "title"
          ],
          "vectorsField": "{{codeNode_560.output.vectors}}",
          "metadataField": "{{codeNode_560.output.metadata}}",
          "duplicateOperation": "overwrite"
        }
      },
      "type": "dynamicNode",
      "position": {
        "x": 0,
        "y": 0
      }
    },
    {
      "id": "plus-node-addNode_870476",
      "data": {
        "nodeId": "addNode",
        "values": {
          "nodeName": ""
        }
      },
      "type": "addNode",
      "position": {
        "x": 0,
        "y": 0
      }
    },
    {
      "id": "variablesNode_272",
      "data": {
        "modes": {},
        "nodeId": "variablesNode",
        "values": {
          "mapping": "{\n  \"title\": {\n    \"type\": \"string\",\n    \"value\": \"{{triggerNode_1.output.document_key}}\"\n  },\n  \"source\": {\n    \"type\": \"string\",\n    \"value\": \"https://drive.google.com/drive/folders/1oeBVP-aokrik2iSlb9QYNQZXZ13ViXvs?usp=sharing\"\n  }\n}",
          "nodeName": "Variables"
        }
      },
      "type": "dynamicNode",
      "position": {
        "x": 0,
        "y": 0
      }
    }
  ],
  "edges": [
    {
      "id": "variablesNode_272-chunkNode_934",
      "type": "defaultEdge",
      "source": "variablesNode_272",
      "target": "chunkNode_934",
      "sourceHandle": "bottom",
      "targetHandle": "top"
    },
    {
      "id": "chunkNode_934-codeNode_539",
      "type": "defaultEdge",
      "source": "chunkNode_934",
      "target": "codeNode_539",
      "sourceHandle": "bottom",
      "targetHandle": "top"
    },
    {
      "id": "codeNode_539-vectorizeNode_623",
      "type": "defaultEdge",
      "source": "codeNode_539",
      "target": "vectorizeNode_623",
      "sourceHandle": "bottom",
      "targetHandle": "top"
    },
    {
      "id": "vectorizeNode_623-codeNode_560",
      "type": "defaultEdge",
      "source": "vectorizeNode_623",
      "target": "codeNode_560",
      "sourceHandle": "bottom",
      "targetHandle": "top"
    },
    {
      "id": "codeNode_560-IndexNode_343",
      "type": "defaultEdge",
      "source": "codeNode_560",
      "target": "IndexNode_343",
      "sourceHandle": "bottom",
      "targetHandle": "top"
    },
    {
      "id": "IndexNode_343-plus-node-addNode_870476",
      "type": "defaultEdge",
      "source": "IndexNode_343",
      "target": "plus-node-addNode_870476",
      "sourceHandle": "bottom",
      "targetHandle": "top"
    },
    {
      "id": "triggerNode_1-variablesNode_272",
      "type": "defaultEdge",
      "source": "triggerNode_1",
      "target": "variablesNode_272",
      "sourceHandle": "bottom",
      "targetHandle": "top"
    }
  ],
  "status": "active",
  "created_at": "2026-07-14T12:54:42.183847+00:00"
};

export async function getNodesAndEdges(): Promise<{
    nodes: Record<string, any>[],
    edges: Record<string, any>[],
}> {
    return {
        nodes: flowConfig.nodes,
        edges: flowConfig.edges,
    }
}

export async function getFlowConfig(): Promise<Record<string, any>> {
    return flowConfig;
}