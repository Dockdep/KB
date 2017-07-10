using System;
using Newtonsoft.Json;
using Microsoft.WindowsAzure.Storage.Table;

namespace DocumentDBGettingStarted.TableEntityModels
{
  public partial class SubscriberTableEntity : TableEntity
  {
    
    public static string DefaultPartitionKey = "Subscriber";


    public SubscriberTableEntity()
    {
      PartitionKey = DefaultPartitionKey;
      RowKey = Guid.NewGuid().ToString("N");
    }

    [JsonProperty(PropertyName = "name")]
    public string Name { get; set; }

    [JsonProperty(PropertyName = "nickname")]
    public string Nickname { get; set; }

    [IgnoreProperty]
    public string Id
    {
      get { return this.RowKey; }
      set { this.RowKey = value; }
    }
  }
}
