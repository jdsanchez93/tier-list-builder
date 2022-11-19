FROM node:16.13.0 as clientbuild
WORKDIR /usr/local/app
COPY ./ClientApp/tier-list-builder /usr/local/app/
RUN npm install
RUN npm run build

FROM mcr.microsoft.com/dotnet/sdk:6.0 AS build
WORKDIR /src
COPY ./tier-list-api/tier-list-api.csproj .
RUN dotnet restore
COPY ./tier-list-api .
COPY --from=clientbuild /usr/local/app/dist/tier-list-builder ./wwwroot
RUN dotnet publish -c release -o /app

FROM mcr.microsoft.com/dotnet/aspnet:6.0
WORKDIR /app
COPY --from=build /app .
ENTRYPOINT ["dotnet", "tier-list-api.dll"]
