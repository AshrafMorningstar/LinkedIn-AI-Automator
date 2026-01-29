import requests
import json
import os

def create_github_repo():
    token = os.environ.get("GITHUB_TOKEN")
    if not token:
        print("❌ Error: GITHUB_TOKEN environment variable not set")
        return False
    username = "AshrafMorningstar"
    repo_name = "LinkedIn-AI-Automator"
    
    url = "https://api.github.com/user/repos"
    headers = {
        "Accept": "application/vnd.github+json",
        "Authorization": f"Bearer {token}",
        "X-GitHub-Api-Version": "2022-11-28"
    }
    data = {
        "name": repo_name,
        "description": "AI-powered LinkedIn content automation tool",
        "private": False,
        "auto_init": False
    }
    
    print(f"🚀 Creating repository '{repo_name}' for user '{username}'...")
    response = requests.post(url, headers=headers, data=json.dumps(data))
    
    if response.status_code == 201:
        print(f"✅ Repository created successfully!")
        return True
    elif response.status_code == 422:
        print(f"ℹ️ Repository already exists or error: {response.json().get('message')}")
        return True
    else:
        print(f"❌ Failed to create repository. Status code: {response.status_code}")
        print(f"Error: {response.text}")
        return False

if __name__ == "__main__":
    create_github_repo()
