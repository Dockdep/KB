using Microsoft.AspNetCore.Http;
using System.Threading.Tasks;
using DocumentDBGettingStarted.Model;
using DocumentDBGettingStarted.Repository;
using System.Collections.Generic;
using System.Linq;
using System;
public class GeneratorMiddleware
{
  private readonly RequestDelegate _next;
  private SubscriberDocumentDBRepository db;
  private TagDocumentDBRepository dbTag;
  private ArticleDocumentDBRepository dbArticle;
  private List<string> tagsId = new List<string>();
  public GeneratorMiddleware(RequestDelegate next)
  {
    db = new SubscriberDocumentDBRepository();
    dbTag = new TagDocumentDBRepository();
    dbArticle = new ArticleDocumentDBRepository();
    this._next = next;
  }

  public async Task Invoke(HttpContext context)
  {
    IEnumerable<Subscriber> data = db.GetAllList();
    if (data != null && data.GetEnumerator().MoveNext())
    {
      await _next.Invoke(context);
    }
    else
    {
      try
      {
        Subscriber subscriber1 = new Subscriber()
        {
          Name = "Suscriber1",
          Nickname = "Suscriber1",
        };
        Subscriber subscriber2 = new Subscriber()
        {
          Name = "Suscriber2",
          Nickname = "Suscriber2",
        };
        db.Create(subscriber1);
        db.Create(subscriber2);

        IEnumerable<Subscriber> subscribers = db.GetAllListWhere(f => f.Nickname == "Suscriber1").Result;
        Subscriber subscriber = subscribers.FirstOrDefault();
        Tag tag1 = new Tag()
        {
          Name = "Tag1",
          SubscriberId = subscriber.Id
        };
        Tag tag2 = new Tag()
        {
          Name = "Tag2",
          SubscriberId = subscriber.Id
        };
        Tag tag3 = new Tag()
        {
          Name = "Tag3",
          SubscriberId = subscriber.Id
        };
        dbTag.Create(tag1);
        dbTag.Create(tag2);
        dbTag.Create(tag3);
        IEnumerable<Tag> tags = dbTag.GetAllList();
        foreach (Tag tag in tags)
        {
          tagsId.Add(tag.Id);
        }

        Article article1 = new Article()
        {
          Title = "Article 1",
          Content = "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nam ullamcorper dui eu convallis luctus. Donec fringilla erat faucibus orci feugiat, ac tincidunt odio posuere. Ut porta at sem vitae commodo. Cras a suscipit orci, vitae tempus justo. Etiam convallis blandit ultrices. Mauris auctor urna vel ultricies euismod. Sed sed euismod orci. Suspendisse potenti. Sed eu libero et nibh eleifend pharetra. In ac lobortis erat. Maecenas faucibus tortor sit amet turpis semper laoreet. Aenean efficitur euismod arcu. Sed ut lectus scelerisque odio facilisis scelerisque et et enim. Aenean nec ex quis erat eleifend blandit. Etiam non arcu eu lectus aliquet sagittis. Cras nec purus magna. Mauris nec est ullamcorper, posuere magna et, eleifend massa. Aliquam iaculis quam lorem, id aliquam arcu tristique maximus. Morbi porttitor accumsan arcu vitae efficitur. Duis faucibus purus ut convallis euismod. Quisque facilisis scelerisque diam, eget tempus lectus consectetur at. Vestibulum venenatis felis egestas dapibus dictum. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia Curae; Suspendisse quis consequat ex. Suspendisse convallis tortor non augue semper mollis.",
          OwnerId = subscriber.Id,
          SubscriberId = subscriber.Id,
          DateCreated = DateTime.Now.ToString("hh:mm:ss dd.MM.yyyy"),
          TagsId = tagsId.ToArray()
        };
        Article article2 = new Article()
        {
          Title = "Article 2",
          Content = "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nam ullamcorper dui eu convallis luctus. Donec fringilla erat faucibus orci feugiat, ac tincidunt odio posuere. Ut porta at sem vitae commodo. Cras a suscipit orci, vitae tempus justo. Etiam convallis blandit ultrices. Mauris auctor urna vel ultricies euismod. Sed sed euismod orci. Suspendisse potenti. Sed eu libero et nibh eleifend pharetra. In ac lobortis erat. Maecenas faucibus tortor sit amet turpis semper laoreet. Aenean efficitur euismod arcu. Sed ut lectus scelerisque odio facilisis scelerisque et et enim. Aenean nec ex quis erat eleifend blandit. Etiam non arcu eu lectus aliquet sagittis. Cras nec purus magna. Mauris nec est ullamcorper, posuere magna et, eleifend massa. Aliquam iaculis quam lorem, id aliquam arcu tristique maximus. Morbi porttitor accumsan arcu vitae efficitur. Duis faucibus purus ut convallis euismod. Quisque facilisis scelerisque diam, eget tempus lectus consectetur at. Vestibulum venenatis felis egestas dapibus dictum. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia Curae; Suspendisse quis consequat ex. Suspendisse convallis tortor non augue semper mollis.",
          OwnerId = subscriber.Id,
          SubscriberId = subscriber.Id,
          DateCreated = DateTime.Now.ToString("hh:mm:ss dd.MM.yyyy"),
          TagsId = tagsId.ToArray()
        };
        Article article3 = new Article()
        {
          Title = "Article 3",
          Content = "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nam ullamcorper dui eu convallis luctus. Donec fringilla erat faucibus orci feugiat, ac tincidunt odio posuere. Ut porta at sem vitae commodo. Cras a suscipit orci, vitae tempus justo. Etiam convallis blandit ultrices. Mauris auctor urna vel ultricies euismod. Sed sed euismod orci. Suspendisse potenti. Sed eu libero et nibh eleifend pharetra. In ac lobortis erat. Maecenas faucibus tortor sit amet turpis semper laoreet. Aenean efficitur euismod arcu. Sed ut lectus scelerisque odio facilisis scelerisque et et enim. Aenean nec ex quis erat eleifend blandit. Etiam non arcu eu lectus aliquet sagittis. Cras nec purus magna. Mauris nec est ullamcorper, posuere magna et, eleifend massa. Aliquam iaculis quam lorem, id aliquam arcu tristique maximus. Morbi porttitor accumsan arcu vitae efficitur. Duis faucibus purus ut convallis euismod. Quisque facilisis scelerisque diam, eget tempus lectus consectetur at. Vestibulum venenatis felis egestas dapibus dictum. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia Curae; Suspendisse quis consequat ex. Suspendisse convallis tortor non augue semper mollis.",
          OwnerId = subscriber.Id,
          SubscriberId = subscriber.Id,
          DateCreated = DateTime.Now.ToString("hh:mm:ss dd.MM.yyyy"),
          TagsId = tagsId.ToArray()
        };
        Article article4 = new Article()
        {
          Title = "Article 4",
          Content = "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nam ullamcorper dui eu convallis luctus. Donec fringilla erat faucibus orci feugiat, ac tincidunt odio posuere. Ut porta at sem vitae commodo. Cras a suscipit orci, vitae tempus justo. Etiam convallis blandit ultrices. Mauris auctor urna vel ultricies euismod. Sed sed euismod orci. Suspendisse potenti. Sed eu libero et nibh eleifend pharetra. In ac lobortis erat. Maecenas faucibus tortor sit amet turpis semper laoreet. Aenean efficitur euismod arcu. Sed ut lectus scelerisque odio facilisis scelerisque et et enim. Aenean nec ex quis erat eleifend blandit. Etiam non arcu eu lectus aliquet sagittis. Cras nec purus magna. Mauris nec est ullamcorper, posuere magna et, eleifend massa. Aliquam iaculis quam lorem, id aliquam arcu tristique maximus. Morbi porttitor accumsan arcu vitae efficitur. Duis faucibus purus ut convallis euismod. Quisque facilisis scelerisque diam, eget tempus lectus consectetur at. Vestibulum venenatis felis egestas dapibus dictum. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia Curae; Suspendisse quis consequat ex. Suspendisse convallis tortor non augue semper mollis.",
          OwnerId = subscriber.Id,
          SubscriberId = subscriber.Id,
          DateCreated = DateTime.Now.ToString("hh:mm:ss dd.MM.yyyy"),
          TagsId = tagsId.ToArray()
        };
        Article article5 = new Article()
        {
          Title = "Article 5",
          Content = "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nam ullamcorper dui eu convallis luctus. Donec fringilla erat faucibus orci feugiat, ac tincidunt odio posuere. Ut porta at sem vitae commodo. Cras a suscipit orci, vitae tempus justo. Etiam convallis blandit ultrices. Mauris auctor urna vel ultricies euismod. Sed sed euismod orci. Suspendisse potenti. Sed eu libero et nibh eleifend pharetra. In ac lobortis erat. Maecenas faucibus tortor sit amet turpis semper laoreet. Aenean efficitur euismod arcu. Sed ut lectus scelerisque odio facilisis scelerisque et et enim. Aenean nec ex quis erat eleifend blandit. Etiam non arcu eu lectus aliquet sagittis. Cras nec purus magna. Mauris nec est ullamcorper, posuere magna et, eleifend massa. Aliquam iaculis quam lorem, id aliquam arcu tristique maximus. Morbi porttitor accumsan arcu vitae efficitur. Duis faucibus purus ut convallis euismod. Quisque facilisis scelerisque diam, eget tempus lectus consectetur at. Vestibulum venenatis felis egestas dapibus dictum. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia Curae; Suspendisse quis consequat ex. Suspendisse convallis tortor non augue semper mollis.",
          OwnerId = subscriber.Id,
          SubscriberId = subscriber.Id,
          DateCreated = DateTime.Now.ToString("hh:mm:ss dd.MM.yyyy"),
          TagsId = tagsId.ToArray()
        };

        dbArticle.Create(article1);

        dbArticle.Create(article2);

        dbArticle.Create(article3);

        dbArticle.Create(article4);

        dbArticle.Create(article5);

      }
      catch (Exception e) {
        await context.Response.WriteAsync(e.Message);
      }
     

    }
  }
}