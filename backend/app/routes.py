from flask import jsonify, request
import json

PROFILE_LIST_FILE = "./profiles_list.json"
PROFILE_DATA_FILE = "./profiles_data.json"

def read_profiles():
    try:
        with open(PROFILE_DATA_FILE, "r") as file:
            return json.load(file)
    except FileNotFoundError:
        print("File not found. Returning an empty list.") 
        return []

def write_profiles(data):
    with open(PROFILE_DATA_FILE, "w") as file:
        json.dump(data, file, indent=4)

# Function to register routes
def register_routes(app):
    @app.route('/api/profiles', methods=['GET'])
    def get_profiles():
        profiles = read_profiles()
        return jsonify(profiles)
    
    @app.route('/api/profiles/<int:profile_id>', methods=['GET'])
    def get_profile_by_id(profile_id):
        profiles = read_profiles()
        # Find the profile by matching the id
        profile = next((p for p in profiles if p['id'] == profile_id), None)
        if profile:
            return jsonify(profile)
        else:
            return jsonify({'message': 'Profile not found'}), 404

    @app.route('/api/profiles', methods=['POST'])
    def add_profile():
        new_profile = request.json
        profiles = read_profiles()
        profiles.append(new_profile)
        write_profiles(profiles)
        return jsonify(new_profile), 201
