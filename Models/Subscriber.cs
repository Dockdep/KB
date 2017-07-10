using MongoDB.Bson;
using MongoDB.Bson.Serialization.Attributes;
using Newtonsoft.Json;

namespace DocumentDBGettingStarted.Models
{
  public partial class Subscriber
  {
    [JsonProperty(PropertyName = "id")]
    public string Id { get; set; }
    [BsonElement("name")]
    [JsonProperty(PropertyName = "name")]
    public string Name { get; set; }
    [BsonElement("nickname")]
    [JsonProperty(PropertyName = "nickname")]
    public string Nickname { get; set; }
  }
}
