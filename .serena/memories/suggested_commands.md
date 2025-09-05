# Suggested Commands for Media Literacy Project

## Development Commands

### Running the Application
```bash
streamlit run streamlit_app.py --server.enableCORS false --server.enableXsrfProtection false
```
- Default runs on port 8501
- Access via browser at localhost:8501

### Package Management
```bash
pip3 install --user -r requirements.txt
```

### System Commands (Linux)
- `ls` - list directory contents
- `cd` - change directory
- `grep` - search text in files
- `find` - find files and directories
- `git` - version control commands

## Project Structure
```
media-literacy/
├── .devcontainer/          # Dev container configuration
├── .serena/               # Serena tool files
├── .claude/               # Claude Code files
├── streamlit_app.py       # Main Streamlit application
├── requirements.txt       # Python dependencies
└── README.md             # Project documentation
```