# TaskSyncer API

- This Node.js application seamlessly integrates Asana and Airtable, automating the process of copying newly created tasks from Asana to an Airtable table. The app utilizes ngrok to receive webhook events, enabling a streamlined workflow for project management and data organization, perfect for a marketing agency.

## Features

- Verifies the authenticity of incoming webhook events using HMAC signatures.
- Processes specific events related to task updates in Asana.
- Creates records in Airtable based on the processed task events.

## Prerequisites

Before you begin, ensure you have met the following requirements:

- Node.js and npm installed on your machine.
- API keys and access tokens for Asana and Airtable.
- Properly configured environment variables (as mentioned in the code).

## Setup

1. Clone this repository:

```bash
git clone https://github.com/sobebarali/asana-airtable-integration.git
cd asana-airtable-integration
```

2. Configure Environment Variables:

Rename the .env.example file to .env and provide the required information.

```bash
asana_pat: Your Asana Personal Access Token.
asana_project_gid: The GID of the Asana project you want to monitor.
asana_webhook_url: The URL where Asana should send webhook events.
airtable_api_key: Your Airtable API Key.
airtable_base_id: The ID of your Airtable base where you want to create records.
```

3. Install the dependencies:

```bash
npm install
```

4. Run the application:

```bash
npm run dev
```
