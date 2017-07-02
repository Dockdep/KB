using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using DocumentDBGettingStarted.Model;
using DocumentDBGettingStarted.Repository;

namespace DocumentDBGettingStarted.Controllers
{

    public class TagController : Controller
    {
        private IRepository<Tag, string> db;
        public TagController()
        {
            db = new TagDocumentDBRepository();
        }

        // GET: Subscriber
        public ActionResult Index()
        {
            try
            {
                var user = HttpContext.Session.GetString("user");
                return Json(db.GetAllListWhere(t=>t.SubscriberId == user).Result);

            }
            catch (Exception e)
            {
                return Json(e.Message);
            }
        }

        // GET: Subscriber/Details/5
        public ActionResult Details(string id)
        {
            try
            {
                return Json(db.Details(id).Result);

            }
            catch (Exception e)
            {
                return Json(e.Message);
            }
        }

        // POST: Subscriber/Create
        [HttpPost]
        public ActionResult Create([FromBody] Tag collection)
        {
            try
            {
                db.Create(collection);
                return Ok();

            }
            catch (Exception e)
            {
                return Json(e.Message);
            }
        }

        // POST: Subscriber/Edit/5
        [HttpPost]
        public ActionResult Edit(string id, [FromBody]  Tag collection)
        {
            try
            {
                db.Update(id, collection);
                return Ok();

            }
            catch (Exception e)
            {
                return Json(e.Message);
            }
        }

        // POST: Subscriber/Delete/5
        [HttpPost]
        public ActionResult Delete(string id)
        {
            try
            {
                db.Delete(id);
                return Ok();

            }
            catch (Exception e)
            {
                return Json(e.Message);
            }
        }
    }
}