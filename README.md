# Midterm Dockerization

Implemented with NodeJS for back-end handling and MongoDB for database storing. Deploy and running by Docker.

## Description

This paper presents a detailed exploration of Docker as a solution for deploying and managing Node.js-based web applications. By leveraging Docker containers, the 
project ensures application consistency across multiple environments, addressing common web development challenges such as environment differences, resource 
management, and scalability. Key technologies discussed include Docker Compose for service orchestration, Nginx for load balancing, and Redis for data caching
optimization. The paper analyzes the project’s architecture, deployment strategy, and performance results, highlighting Docker’s role in supporting a scalable,
reliable, and efficient deployment process for modern web applications. Insights into overcoming networking, configuration, and scaling challenges are also
presented, illustrating the advantages and limitations of Docker in real-world application scenarios.

## Requirements

* Node.js version v20.17.0 or higher (optional)
* Docker version 27.2.0 or higher
* Nginx stable version 1.26.2 for Windows

## Usage

To run the system, please clone the repository first. On the ` <> Code ` of this repository, select SSH for MacOS or HTTPS:  ` https://github.com/giahao1411/midterm-node-docker.git `

Next, move to the directory you want to place at. Open Command Prompt or Windows PowerShell and clone the project by

<pre>
    <code id="code">git clone https://github.com/giahao1411/midterm-node-docker.git</code><button class="copy-btn" onclick="copyCode()"></button>
</pre>

At this, you can see the whole project is cloned by the folder name ` midterm-node-docker `. Move into the folder by ` cd midterm-node-docker `

On the next step, we will talk about how to deploy and running the application on Docker by using multiple virtual machines. 

So on the ` docker-compose.yml ` file, you can see that we don't build on running the app image, we running by the pre-created image named "midterm-node-docker-app". 
So we have to build the app image first.

To build the image, we can follow by

<pre>
    <code id="code">docker build -t midterm-node-docker-app .</code><button class="copy-btn" onclick="copyCode()"></button>
</pre>

-t means naming the image midterm-node-docker-app, "." means the current working directory of the Docker. We can check that if the image is created by ` docker images ` and find the image that you named before.

If everything is fine by now, we move to the next step, which is deploying the application with Docker Swarm.

<pre>
    <code id="code">docker swarm init</code><button class="copy-btn" onclick="copyCode()"></button>
</pre>

to initiate the swarm, and you can see the current node is play as a manager role of the Docker Swarm.

To deploy and running the application, run

<pre>
    <code id="code">docker stack deploy -c docker-compose.yml midterm-app</code><button class="copy-btn" onclick="copyCode()"></button>
</pre>

This command will build the ` docker-compose.yml ` file and running on Docker Swarm.

It takes time to build if you haven't had the node, nginx, redis or mongodb images. Chilling and waiting for the result ~~!

After built successfully, you can check the stack by ` docker stack ls ` which is list all the existed stacks on Docker Swarm. Remember that, this only on the manager node.

Checking if the application is running properly ` docker service ls ` which is list all the running services. This must be including nginx, redis, mongodb and app.

After all the services running properly, you can experience the application by open a browser and running ` localhost `. This is because the reverse proxy is working on port 80. 

## License

This project is licensed under the 

## Author

This program was created by 

* [giahao1411](https://github.com/giahao1411)
* [huyblue17](https://github.com/huyblue17)
* [nhathao512](https://github.com/nhathao512)


Thanks for visting our project! Wish you a good day and best sleeping experience from struggling deadline day by day.
