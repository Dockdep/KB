//using System;
//using System.Collections.Generic;
//using System.Linq;
//using System.Threading.Tasks;
//using Microsoft.Azure.Documents.Client;
//using Microsoft.Azure.Documents.Linq;
//using DocumentDBGettingStarted.Models;
//using Microsoft.Azure.Documents;
//using System.Linq.Expressions;
//using MongoDB.Bson;
//using MongoDB.Driver;
//using System.Collections.Generic;
//using System.Security.Authentication;

//namespace DocumentDBGettingStarted.Repository
//{

//  public class SubscriberMongoDBRepository : IRepository<Subscriber, ObjectId>
//  {
//    MongoClient _client;
//    private readonly IMongoDatabase _mongoDatabase;
//    public SubscriberMongoDBRepository()
//    {
//      string connectionString =
//   @"mongodb://mongo-single-app:CZ6qfwKpuEC9PioqLMJofkoO9rOJT3eeXgxTpHMMU02nx4SDnstM5OYsS1MX3M3IoNY4c79e1QfhF3fMLj5SEg==@mongo-single-app.documents.azure.com:10255/?ssl=true&replicaSet=globaldb";
//      MongoClientSettings settings = MongoClientSettings.FromUrl(
//        new MongoUrl(connectionString)
//      );
//      settings.SslSettings =
//        new SslSettings() { EnabledSslProtocols = SslProtocols.Tls12 };
//      _client = new MongoClient(settings);
//      _mongoDatabase = _client.GetDatabase("KnowledgeBase");
//    }

//    public IEnumerable<Subscriber> GetAllList()
//    {

//      return _mongoDatabase.GetCollection<Subscriber>("Subscriber").Find(FilterDefinition<Subscriber>.Empty).ToEnumerable();
//    }

//    public Task<IEnumerable<Subscriber>> GetAllListWhere(Expression<Func<Subscriber, bool>> filter)
//    {

//      return Task.Run(() =>
//      {

//        var res = Builders<Subscriber>.Filter.Where(filter);
//        return _mongoDatabase.GetCollection<Subscriber>("Subscriber").Find(res).ToEnumerable();
//      });

//    }


//    public Task<Subscriber> Details(ObjectId id)
//    {

//      try
//      {
//        return Task.Run(() =>
//        {
//          var res = Builders<Subscriber>.Filter.Eq(p => p.Id, id);
//          return _mongoDatabase.GetCollection<Subscriber>("Subscriber").Find(res).FirstOrDefault();
//        });
//      }
//      catch (Exception e)
//      {
//        throw new Exception(e.Message);
//      }


//    }

//    public void Create(Subscriber p)
//    {
//      _mongoDatabase.GetCollection<Subscriber>("Subscriber").InsertOne(p);

//    }

//    public void Update(ObjectId id, Subscriber p)
//    {

//    }

//    public void Delete(ObjectId id)
//    {

//    }
//    public void Save() { }

//    public void Dispose() { }

//  }
//}
