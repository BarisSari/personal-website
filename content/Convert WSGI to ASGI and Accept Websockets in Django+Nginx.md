### Convert WSGI to ASGI and Accept Websockets in Django+Nginx

#### Convert your Django project to accept async requests so that it will be possible to handle them in real-time. Use Django-channels+Uvicorn+Nginx

![img](https://cdn-images-1.medium.com/max/2600/0*bRJIm-3sScAT2GTw)You should handle Websockets requests fast! Photo by [Marc-Olivier Jodoin](https://unsplash.com/@marcojodoin?utm_source=medium&utm_medium=referral) on [Unsplash](https://unsplash.com/?utm_source=medium&utm_medium=referral)

In this tutorial, I’ll show you how to convert your existing WSGI Django project to ASGI. Then, I’ll add Django Channels and all necessary configurations.

### What is the difference between Websockets and HTTP?

**Websockets** is a protocol that allows two-way, i.e. full-duplex, communications between client and server sides after a *Websockets handshake*. It works just like HTTP until a handshake. But, when a client sends a Websockets request to the server, it is accepted by the server, and a proper response is returned (that’s what is Websockets handshake basically), HTTP protocol upgrades to Websockets. So, it means that Websockets connection is established and you can start sending and receiving data between the client and the server. 

Websockets are commonly used for messaging, multiplayer gaming, collaborative document editing, real-time interactive graphs, and many more. 

### Requirements

You should have at least **Django 3.0** and **Nginx 1.3**.

### What is the difference between WSGI and ASGI?



### Async Requests — Django vs. Flask vs. FastAPI

**Django** started **natively** **supporting ASGI protocol from 3.0** and **async views from 3.1.**

**Flask doesn’t support async requests** at all. Yet, there is another framework which has the same syntax as Flask and also accept Websockets: [Quart](https://gitlab.com/pgjones/quart/). 

**FastAPI** is **natively supporting** **async requests**. You don’t need to do any configuration.



You don’t have to use Django Channels. You can create your own Middleware to handle Websockets requests. For example, one of the most starred Django projects, django-cookiecutter, comes with the following ASGI middleware if you say yes to `use_async` :



### Add Django Channels



### **Conclusion**

### Resources