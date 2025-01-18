## Kafka Overview

![Kafka Overview)](https://contabo.com/blog/wp-content/uploads/2023/12/image-6.jpeg.webp)


Kafka is a distributed messaging system that provides scalability, fault-tolerance, and high-throughput capabilities.

---

### Kafka Architecture

- **Kafka**
    - A distributed system consisting of topics, partitions, and brokers.

- **Topic**
    - A category to which messages are sent by producers. It can be divided into multiple **partitions** for parallelism.

- **Partitions**
    - Subdivisions of a topic that allow for message distribution across multiple consumers. Partitions are indexed as Partition A (0), Partition B (1), Partition C (2), etc.

### Consumer and Consumer Group
- **Consumer**
    - An entity that reads messages from Kafka topics. Kafka uses an auto-balancing mechanism to distribute partitions among consumers.

- **Consumer Group**
    - A collection of consumers that allows partition balancing within the group. Each partition is consumed by only one consumer within a group.

### Key Rules
- A single consumer can consume messages from multiple partitions.

- Multiple consumers cannot consume messages from the same partition simultaneously.

> **Note**: Kafka uses consumer groups to solve this issue, ensuring self-balancing at the group level.

---

### **Comparisons with Data Structures and Messaging Models**

- **Queue Model**
    - Involves one producer and consumer.

- **Pub/Sub Model**
    - Involves one producer and multiple consumers.

***In Kafka***

- **Queue**
    - To implement a queue, the number of consumers should equal the number of partitions.

- **Pub/Sub**
    - To implement pub/sub, one consumer can consume messages from multiple partitions.

---

### Zookeper

Kafka uses Zookeeper to maintain partition and consumer information.

### Steps to Start Kafka
1. **Run Zookeeper**
    - Use the default port 2181.

2. **Run the Kafka server**
    - Use the default port 9092.

---

### Kafka Terminology Summary
- ***Admin***
    - Responsible for infrastructure setup, including creating topics.

- ***Broker***
    - The Kafka service where partitions and messages are managed.

- ***clientId***
    - An identifier for a Kafka client, which can be any arbitrary name.

- ***Topic***
    - A named entity representing a stream of messages.

- ***Producer***
    - Sends messages to a Kafka topic.

- ***Consumer***
    - Reads messages from a Kafka topic.

