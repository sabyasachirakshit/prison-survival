from flask import jsonify, request
import sys
import os
sys.path.insert(0, os.path.abspath(os.path.join(os.path.dirname(__file__), '..')))
import json
from components.initialize_profile_data import select_crime




PROFILE_LIST_FILE = "./profiles_list.json"
PROFILE_DATA_FILE = "./profiles_data.json"

def read_profiles(check=False):
    try:
        if check:
            with open(PROFILE_DATA_FILE, "r") as file:
                return json.load(file)
        else:
            with open(PROFILE_LIST_FILE, "r") as file:
                return json.load(file)
    except FileNotFoundError:
        print("File not found. Returning an empty list.") 
        return []

def write_profiles(data,check=False):
    if check:
        with open(PROFILE_DATA_FILE, "w") as file:
            json.dump(data, file, indent=4)
    else:
        with open(PROFILE_LIST_FILE, "w") as file:
            json.dump(data, file, indent=4)

# Function to register routes
def register_routes(app):
    @app.route('/api/profiles', methods=['GET'])
    def get_profiles():
        profiles = read_profiles(False)
        return jsonify(profiles)
    
    @app.route('/api/profiles/<int:profile_id>', methods=['GET'])
    def get_profile_by_id(profile_id):
        profiles = read_profiles(True)
        # Find the profile by matching the id
        profile = next((p for p in profiles if p['id'] == profile_id), None)
        if profile:
            return jsonify(profile)
        else:
            return jsonify({'message': 'Profile not found'}), 404

    @app.route('/api/profiles', methods=['POST'])
    def add_profile():
        new_profile = request.json
        # Append the crime data to the new profile
        new_profile['crime'] = select_crime()
        profiles = read_profiles(False)
        profiles.append(new_profile)
        write_profiles(profiles,False)
        
        profiles_data = read_profiles(True)
        profiles_data.append(new_profile)
        write_profiles(profiles_data, is_data=True)
        return jsonify(new_profile), 201
