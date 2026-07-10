const flowConfig = {
  "id": "c32948c5-d296-4338-b1de-9087ea772918",
  "name": "My First Flow",
  "edges": [
    {
      "id": "trigger-llmNode",
      "type": "defaultEdge",
      "source": "trigger",
      "target": "llmNode",
      "sourceHandle": "bottom",
      "targetHandle": "top"
    },
    {
      "id": "llmNode-responseNode",
      "type": "defaultEdge",
      "source": "llmNode",
      "target": "responseNode",
      "sourceHandle": "bottom",
      "targetHandle": "top"
    },
    {
      "id": "response-trigger",
      "type": "responseEdge",
      "source": "trigger",
      "target": "responseNode",
      "sourceHandle": "to-response",
      "targetHandle": "from-trigger"
    }
  ],
  "status": "active",
  "created_at": "2026-07-10T15:32:08.855371+00:00",
  "trigger_id": null,
  "nodes": [
    {
      "id": "trigger",
      "data": {
        "modes": {},
        "nodeId": "graphqlNode",
        "values": {
          "id": "trigger",
          "headers": "",
          "retries": "0",
          "nodeName": "API Request",
          "webhookUrl": "",
          "responeType": "realtime",
          "retry_deplay": "0",
          "advance_schema": "{\"userPrompt\":\"string\"}"
        },
        "trigger": true
      },
      "type": "triggerNode",
      "measured": {
        "width": 216,
        "height": 93
      },
      "position": {
        "x": 0,
        "y": 0
      },
      "selected": false
    },
    {
      "id": "llmNode",
      "data": {
        "label": "dynamicNode node",
        "modes": {},
        "nodeId": "LLMNode",
        "values": {
          "id": "llmNode",
          "tools": [],
          "prompts": [
            {
              "id": "a2a1fe49-517e-42c7-9b20-194918b2936f",
              "role": "system",
              "content": "You are an AI Assistant"
            },
            {
              "id": "1c06db4f-c8e6-44da-9c93-24adfb5b5ca9",
              "role": "user",
              "content": "You are William Shakespeare reborn — a master of iambic rhythm, rich metaphors, and eloquent verse.\nWhen asked something, answer as a poem in the style of Shakespeare.\nuser prompt: \nwhat is the capital of USA\n{{trigger.output.userPrompt}}"
            }
          ],
          "memories": "[]",
          "messages": "[]",
          "nodeName": "Generate Text",
          "attachments": "",
          "credentials": "",
          "generativeModelName": [
            {
              "type": "generator/text",
              "params": {},
              "configName": "configA",
              "model_name": "gemini/gemini-2.5-flash",
              "credentialId": "ec36bc60-8dbe-4b0f-ba8c-23f1ae732ebd",
              "provider_name": "gemini",
              "credential_name": "Test_model"
            }
          ]
        }
      },
      "type": "dynamicNode",
      "measured": {
        "width": 216,
        "height": 93
      },
      "position": {
        "x": 0,
        "y": 130
      },
      "selected": true
    },
    {
      "id": "responseNode",
      "data": {
        "label": "Response",
        "nodeId": "graphqlResponseNode",
        "values": {
          "nodeName": "API Response",
          "outputMapping": "{\n  \"response\": \"{{llmNode.output.generatedResponse}}\"\n}"
        },
        "isResponseNode": true
      },
      "type": "responseNode",
      "measured": {
        "width": 216,
        "height": 93
      },
      "position": {
        "x": 0,
        "y": 260
      },
      "selected": false
    }
  ]
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