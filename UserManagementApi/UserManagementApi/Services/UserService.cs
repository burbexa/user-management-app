using UserManagementApi.Features.Users.Models;

namespace UserManagementApi.Services
{
    public class UserService
    {
        private readonly HttpClient _httpClient;
        private List<User> _localUsers = new();
        private bool _initialized = false;

        public UserService(HttpClient httpClient)
        {
            _httpClient = httpClient;
        }

        public async Task<List<User>> GetUsersAsync()
        {
            if (!_initialized)
            {
                var remoteUsers = await _httpClient.GetFromJsonAsync<List<User>>("https://jsonplaceholder.typicode.com/users");
                _localUsers = remoteUsers ?? new List<User>();
                _initialized = true;
            }

            return _localUsers;
        }

        public async Task<User?> GetUserByIdAsync(int id)
        {
            var users = await GetUsersAsync();
            return users.FirstOrDefault(u => u.Id == id);
        }

        public void AddUser(User user)
        {
            user.Id = _localUsers.Count + 1000; // Offset ID
            _localUsers.Add(user);
        }

        public bool UpdateUser(int id, User updated)
        {
            var user = _localUsers.FirstOrDefault(u => u.Id == id);
            if (user == null) return false;

            user.Name = updated.Name;
            user.Email = updated.Email;
            return true;
        }

        public bool DeleteUser(int id)
        {
            var user = _localUsers.FirstOrDefault(u => u.Id == id);
            if (user == null) return false;

            _localUsers.Remove(user);
            return true;
        }
    }
}
