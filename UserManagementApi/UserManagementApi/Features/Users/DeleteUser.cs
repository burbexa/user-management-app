using UserManagementApi.Services;

namespace UserManagementApi.Features.Users
{
    public class DeleteUser : IEndpoint
    {
        public void MapEndpoints(WebApplication app)
        {
            app.MapDelete("/api/users/{id:int}", (int id, UserService service) =>
            {
                var deleted = service.DeleteUser(id);
                return deleted ? Results.Ok() : Results.NotFound();
            }).WithName("DeleteUser");
        }
    }
}
