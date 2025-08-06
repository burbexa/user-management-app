using UserManagementApi.Services;
namespace UserManagementApi.Features.Users
{
    public class GetAllUsers : IEndpoint
    {
        public void MapEndpoints(WebApplication app)
        {
            app.MapGet("/api/users", async (UserService service) =>
                await service.GetUsersAsync()
            ).WithName("GetAllUsers");
        }
    }
}
