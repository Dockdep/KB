using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using DocumentDBGettingStarted.Models;
using DocumentDBGettingStarted.Repository;

namespace DocumentDBGettingStarted.Controllers
{

    public class SubscriberController : Controller
    {
        private IRepository<Subscriber, string> db;
        public SubscriberController()
        {
            db = new SubscriberDocumentDBRepository();
        }

        // GET: Subscriber
        public ActionResult Index()
        {
            try
            {
                return Json(db.GetAllList());

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
        public ActionResult Create([FromBody] Subscriber collection)
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
        public ActionResult Edit(string id, [FromBody]  Subscriber collection)
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
        // POST: Subscriber/Login/864
        [HttpPost]
        public ActionResult Login(string id)
        {
            HttpContext.Session.SetString("user", id);

            return Ok();
        }

        // POST: Subscriber/Logout
        [HttpPost]
        public ActionResult Logout()
        {
            HttpContext.Session.SetString("user", "");
            return Ok();
        }
  }
}