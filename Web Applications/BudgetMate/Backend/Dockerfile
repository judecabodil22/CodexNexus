# Use the official ASP.NET Core SDK image for building
FROM mcr.microsoft.com/dotnet/sdk:8.0 AS build
WORKDIR /app

# Copy the project file and restore dependencies
COPY *.csproj ./
RUN dotnet restore

# Copy the remaining source code and build the application
COPY . ./
RUN dotnet publish -c Release -o out

# Use the official ASP.NET Core runtime image for running the application
FROM mcr.microsoft.com/dotnet/aspnet:8.0
WORKDIR /app
COPY --from=build /app/out .

# Expose the port (Cloud Run uses the PORT environment variable, defaulting to 8080)
# This instruction is for documentation; the app needs to listen on the PORT env var.
EXPOSE 8080

# Set the entry point
ENTRYPOINT ["dotnet", "BudgetMate.dll"]
