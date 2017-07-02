using Newtonsoft.Json;

namespace DocumentDBGettingStarted.Model
{
    public partial class Subscriber
    {
        [JsonProperty(PropertyName = "id")]
        public string Id { get; set; }
        [JsonProperty(PropertyName = "name")]
        public string Name { get; set; }
        [JsonProperty(PropertyName = "nickname")]
        public string Nickname { get; set; }
    }
}
