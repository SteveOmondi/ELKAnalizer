FROM mcr.microsoft.com/dotnet/aspnet:8.0 AS base
WORKDIR /app
EXPOSE 8080

FROM mcr.microsoft.com/dotnet/sdk:8.0 AS build
WORKDIR /src
COPY ["Mo626LogAnalyser.Server/Mo626LogAnalyser.Server.csproj", "Mo626LogAnalyser.Server/"]
RUN dotnet restore "Mo626LogAnalyser.Server/Mo626LogAnalyser.Server.csproj"
COPY . .
WORKDIR "/src/Mo626LogAnalyser.Server"
RUN dotnet build "Mo626LogAnalyser.Server.csproj" -c Release -o /app/build

FROM build AS publish
RUN dotnet publish "Mo626LogAnalyser.Server.csproj" -c Release -o /app/publish /p:UseAppHost=false

FROM base AS final
WORKDIR /app
COPY --from=publish /app/publish .
ENTRYPOINT ["dotnet", "Mo626LogAnalyser.Server.dll"]
