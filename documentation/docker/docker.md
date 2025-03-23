#### Docker Overview

Docker is a platform that enables you to build, share, and run applications using container. Think of it as a way to package up your application and all its dependencies into a neat, self-contained unit that can run consistently across different environments.

#### Key Concepts and Benefits of Docker

1. Container

   - Containers are lightwight, standalone, and executable packages that include everything needed to run a piece of software: code: runtime, system tools, system libraries, and settings.
   - They isolate the application from the underlyign infrastructure, ensuring that it run the same way regardless of where it's deployed (your laptop, a testing server, a production cloud server, etc)
   - They provide consistency and portability

2. Isolation

   - Containers provide process isolation. They are separate from each other and the host machine, so one container can't interfere with another. This makes the system more secure and stable.

3. Portability

   - Because containers include all dependencies, they are highly portable. You can run a container on any system that has Docker installed, regardless of the operating system or underlying infrastructure

4. Efficiency

   - Containers are lightweight compared to virtual machines (VMs) because they share the host system's kernel. This means they start faster and consume fewer resources.

5. - Images are read-only templates used to create containers. They define what goes into a container (the code, dependencies, etc.).
   - You build images from a Dockerfile, which contains instructions for creating the image.

6. - Docker Hub is a cloud-based registry service where you can find and share Docker images. It's like a GitHub for Docker images.
