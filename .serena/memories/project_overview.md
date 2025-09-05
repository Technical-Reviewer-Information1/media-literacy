# Media Literacy Project Overview

## Project Purpose
This is a Streamlit web application project focused on creating an educational tool for "Media Literacy" - specifically for experiential learning about the characteristics of information and media. The application aims to help users understand the DIKW model (Data, Information, Knowledge, Wisdom) through interactive experiences.

## Tech Stack
- **Primary Framework**: Streamlit (for web application)
- **Language**: Python 3.11
- **Key Dependencies**: 
  - streamlit
  - pandas
  - (User requested to add plotly for visualizations)
- **Development Environment**: Dev Container with Python 3.11 on Bullseye
- **VS Code Extensions**: ms-python.python, ms-python.vscode-pylance

## Current State
- Very minimal project with basic Streamlit setup
- Only contains a simple import statement in streamlit_app.py
- Requirements.txt includes streamlit and pandas
- Configured for development with Dev Container

## Run Command
According to devcontainer.json, the application runs with:
```bash
streamlit run streamlit_app.py --server.enableCORS false --server.enableXsrfProtection false
```
Default port: 8501