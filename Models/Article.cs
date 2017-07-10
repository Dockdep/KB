using Newtonsoft.Json;

namespace DocumentDBGettingStarted.Models
{
  public partial class Article
  {
    public const int New = 1;
    public const int Published = 2;
    public const int Deleted = 3;

    [JsonProperty(PropertyName = "id")]
    public string Id { get; set; }

    [JsonProperty(PropertyName = "title")]
    public string Title { get; set; }

    [JsonProperty(PropertyName = "tagsId")]
    public string[] TagsId { get; set; }

    [JsonProperty(PropertyName = "subscriberId")]
    public string SubscriberId { get; set; }

    [JsonProperty(PropertyName = "ownerId")]
    public string OwnerId { get; set; }

    [JsonProperty(PropertyName = "dateCreated")]
    public string DateCreated { get; set; }

    [JsonProperty(PropertyName = "dateUpdated")]
    public string DateUpdated { get; set; }

    [JsonProperty(PropertyName = "datePublished")]
    public string DatePublished { get; set; }

    [JsonProperty(PropertyName = "content")]
    public string Content { get; set; }

    [JsonProperty(PropertyName = "state")]
    public int State { get; set; }
  }
}
