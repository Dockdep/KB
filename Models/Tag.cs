using Newtonsoft.Json;

namespace DocumentDBGettingStarted.Models
{
    public partial class Tag
    {
        [JsonProperty(PropertyName = "id")]
        public string Id { get; set; }

        [JsonProperty(PropertyName = "parentId")]
        public string ParentId { get; set; }

        [JsonProperty(PropertyName = "subscriberId")]
        public string SubscriberId { get; set; }

        [JsonProperty(PropertyName = "name")]
        public string Name { get; set; }
    }
}
