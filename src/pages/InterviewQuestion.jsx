import { useLocation, useNavigate } from "react-router-dom";
import { useState, useRef } from "react";
import "./InterviewQuestion.css";

function InterviewQuestion() {

    const navigate = useNavigate();
    const location = useLocation();

    // Unique ID for this interview attempt
    const attemptIdRef = useRef(crypto.randomUUID());

    const interviewType =
        location.state?.interviewType || "Technical";

    const subject =
        location.state?.subject || "Java";

    const difficulty =
        location.state?.difficulty || "Easy";


    // =====================================================
    // QUESTION BANK
    // INTERVIEW TYPE → SUBJECT → DIFFICULTY → QUESTIONS
    // =====================================================

    const questions = {

        // =================================================
        // TECHNICAL
        // =================================================

        Technical: {

            // =================================================
            // JAVA
            // =================================================

            Java: {

                Easy: [

                    {
                        question: "What is OOP in Java?",
                        topic: "Java OOP",
                        keywords: [
                            "class",
                            "object",
                            "inheritance",
                            "polymorphism",
                            "encapsulation",
                            "abstraction"
                        ]
                    },

                    {
                        question:
                            "What is the difference between JDK, JRE and JVM?",
                        topic: "Java Basics",
                        keywords: [
                            "jdk",
                            "jre",
                            "jvm",
                            "development",
                            "runtime",
                            "execute"
                        ]
                    },

                    {
                        question:
                            "What is a class and an object in Java?",
                        topic: "Java OOP",
                        keywords: [
                            "class",
                            "object",
                            "blueprint",
                            "instance",
                            "properties",
                            "methods"
                        ]
                    }

                ],

                Medium: [

                    {
                        question:
                            "What is the difference between method overloading and method overriding?",
                        topic: "Java OOP",
                        keywords: [
                            "overloading",
                            "overriding",
                            "same method",
                            "parameters",
                            "compile time",
                            "runtime"
                        ]
                    },

                    {
                        question:
                            "Explain the concept of inheritance in Java.",
                        topic: "Java OOP",
                        keywords: [
                            "inheritance",
                            "parent",
                            "child",
                            "superclass",
                            "subclass",
                            "extends"
                        ]
                    },

                    {
                        question:
                            "What is the difference between ArrayList and LinkedList?",
                        topic: "Java Collections",
                        keywords: [
                            "arraylist",
                            "linkedlist",
                            "array",
                            "nodes",
                            "random access",
                            "insertion",
                            "deletion"
                        ]
                    }

                ],

                Hard: [

                    {
                        question:
                            "Explain how HashMap works internally in Java.",
                        topic: "Java Collections",
                        keywords: [
                            "hashmap",
                            "hash",
                            "bucket",
                            "key",
                            "value",
                            "hashcode",
                            "equals"
                        ]
                    },

                    {
                        question:
                            "What is multithreading and how does synchronization work?",
                        topic: "Multithreading",
                        keywords: [
                            "multithreading",
                            "thread",
                            "synchronization",
                            "shared",
                            "resource",
                            "lock"
                        ]
                    },

                    {
                        question:
                            "Explain the difference between abstraction and encapsulation.",
                        topic: "Java OOP",
                        keywords: [
                            "abstraction",
                            "encapsulation",
                            "hiding",
                            "implementation",
                            "data",
                            "interface"
                        ]
                    }

                ]

            },


            // =================================================
            // C / C++
            // =================================================

            "C / C++": {

                Easy: [

                    {
                        question:
                            "What is the difference between C and C++?",
                        topic: "C / C++ Basics",
                        keywords: [
                            "c",
                            "c++",
                            "object oriented",
                            "procedural",
                            "class",
                            "object"
                        ]
                    },

                    {
                        question:
                            "What is a pointer in C?",
                        topic: "Pointers",
                        keywords: [
                            "pointer",
                            "address",
                            "memory",
                            "variable",
                            "reference"
                        ]
                    },

                    {
                        question:
                            "What is a function in C?",
                        topic: "C Basics",
                        keywords: [
                            "function",
                            "return",
                            "parameter",
                            "argument",
                            "code"
                        ]
                    }

                ],

                Medium: [

                    {
                        question:
                            "Explain pointers and pointer arithmetic in C.",
                        topic: "Pointers",
                        keywords: [
                            "pointer",
                            "address",
                            "memory",
                            "increment",
                            "decrement"
                        ]
                    },

                    {
                        question:
                            "What is inheritance in C++?",
                        topic: "C++ OOP",
                        keywords: [
                            "inheritance",
                            "class",
                            "parent",
                            "child",
                            "derived"
                        ]
                    },

                    {
                        question:
                            "What is function overloading in C++?",
                        topic: "C++ OOP",
                        keywords: [
                            "function",
                            "overloading",
                            "same name",
                            "parameters",
                            "compile time"
                        ]
                    }

                ],

                Hard: [

                    {
                        question:
                            "Explain virtual functions in C++.",
                        topic: "C++ OOP",
                        keywords: [
                            "virtual",
                            "function",
                            "runtime",
                            "polymorphism",
                            "override"
                        ]
                    },

                    {
                        question:
                            "What is a memory leak?",
                        topic: "Memory Management",
                        keywords: [
                            "memory",
                            "leak",
                            "allocation",
                            "deallocation",
                            "free",
                            "delete"
                        ]
                    },

                    {
                        question:
                            "Explain the difference between stack and heap memory.",
                        topic: "Memory Management",
                        keywords: [
                            "stack",
                            "heap",
                            "memory",
                            "allocation",
                            "dynamic"
                        ]
                    }

                ]

            },


            // =================================================
            // PYTHON
            // =================================================

            Python: {

                Easy: [

                    {
                        question:
                            "What is Python?",
                        topic: "Python Basics",
                        keywords: [
                            "python",
                            "programming",
                            "language",
                            "interpreted",
                            "high level"
                        ]
                    },

                    {
                        question:
                            "What are lists in Python?",
                        topic: "Python Collections",
                        keywords: [
                            "list",
                            "collection",
                            "elements",
                            "mutable",
                            "index"
                        ]
                    },

                    {
                        question:
                            "What is a function in Python?",
                        topic: "Python Functions",
                        keywords: [
                            "function",
                            "def",
                            "parameter",
                            "return",
                            "code"
                        ]
                    }

                ],

                Medium: [

                    {
                        question:
                            "What is the difference between a list and a tuple in Python?",
                        topic: "Python Collections",
                        keywords: [
                            "list",
                            "tuple",
                            "mutable",
                            "immutable"
                        ]
                    },

                    {
                        question:
                            "Explain dictionary in Python.",
                        topic: "Python Collections",
                        keywords: [
                            "dictionary",
                            "key",
                            "value",
                            "mapping",
                            "mutable"
                        ]
                    },

                    {
                        question:
                            "What is exception handling in Python?",
                        topic: "Python Exception Handling",
                        keywords: [
                            "exception",
                            "try",
                            "except",
                            "finally",
                            "error"
                        ]
                    }

                ],

                Hard: [

                    {
                        question:
                            "Explain decorators in Python.",
                        topic: "Python Advanced",
                        keywords: [
                            "decorator",
                            "function",
                            "wrapper",
                            "modify",
                            "function"
                        ]
                    },

                    {
                        question:
                            "What is a generator in Python?",
                        topic: "Python Advanced",
                        keywords: [
                            "generator",
                            "yield",
                            "iterator",
                            "lazy"
                        ]
                    },

                    {
                        question:
                            "Explain object-oriented programming in Python.",
                        topic: "Python OOP",
                        keywords: [
                            "class",
                            "object",
                            "inheritance",
                            "polymorphism",
                            "encapsulation"
                        ]
                    }

                ]

            },


            // =================================================
            // DBMS
            // =================================================

            DBMS: {

                Easy: [

                    {
                        question:
                            "What is DBMS?",
                        topic: "DBMS Basics",
                        keywords: [
                            "database",
                            "management",
                            "data",
                            "store",
                            "retrieve"
                        ]
                    },

                    {
                        question:
                            "What is a primary key?",
                        topic: "DBMS Keys",
                        keywords: [
                            "primary key",
                            "unique",
                            "identify",
                            "record",
                            "null"
                        ]
                    },

                    {
                        question:
                            "What is a foreign key?",
                        topic: "DBMS Keys",
                        keywords: [
                            "foreign key",
                            "table",
                            "relationship",
                            "primary key",
                            "reference"
                        ]
                    }

                ],

                Medium: [

                    {
                        question:
                            "What is normalization in DBMS?",
                        topic: "Normalization",
                        keywords: [
                            "normalization",
                            "redundancy",
                            "data",
                            "tables",
                            "dependency"
                        ]
                    },

                    {
                        question:
                            "What is the difference between WHERE and HAVING?",
                        topic: "SQL",
                        keywords: [
                            "where",
                            "having",
                            "group",
                            "condition",
                            "aggregate"
                        ]
                    },

                    {
                        question:
                            "What are joins in SQL?",
                        topic: "SQL Joins",
                        keywords: [
                            "join",
                            "inner",
                            "left",
                            "right",
                            "tables"
                        ]
                    }

                ],

                Hard: [

                    {
                        question:
                            "What is a transaction in DBMS?",
                        topic: "Transactions",
                        keywords: [
                            "transaction",
                            "acid",
                            "atomicity",
                            "consistency",
                            "isolation",
                            "durability"
                        ]
                    },

                    {
                        question:
                            "What is a deadlock in DBMS?",
                        topic: "Transactions",
                        keywords: [
                            "deadlock",
                            "transaction",
                            "resource",
                            "wait",
                            "lock"
                        ]
                    },

                    {
                        question:
                            "Explain indexing in DBMS.",
                        topic: "Database Indexing",
                        keywords: [
                            "index",
                            "search",
                            "database",
                            "performance",
                            "query"
                        ]
                    }

                ]

            },


            // =================================================
            // OPERATING SYSTEMS
            // =================================================

            "Operating Systems": {

                Easy: [

                    {
                        question:
                            "What is an operating system?",
                        topic: "OS Basics",
                        keywords: [
                            "operating system",
                            "hardware",
                            "software",
                            "resource",
                            "manage"
                        ]
                    },

                    {
                        question:
                            "What is a process?",
                        topic: "Processes",
                        keywords: [
                            "process",
                            "program",
                            "execution",
                            "memory"
                        ]
                    },

                    {
                        question:
                            "What is a thread?",
                        topic: "Threads",
                        keywords: [
                            "thread",
                            "process",
                            "execution",
                            "lightweight"
                        ]
                    }

                ],

                Medium: [

                    {
                        question:
                            "What is process scheduling?",
                        topic: "CPU Scheduling",
                        keywords: [
                            "scheduling",
                            "process",
                            "cpu",
                            "ready",
                            "queue"
                        ]
                    },

                    {
                        question:
                            "What is the difference between process and thread?",
                        topic: "Processes & Threads",
                        keywords: [
                            "process",
                            "thread",
                            "memory",
                            "execution",
                            "lightweight"
                        ]
                    },

                    {
                        question:
                            "What is virtual memory?",
                        topic: "Memory Management",
                        keywords: [
                            "virtual memory",
                            "memory",
                            "paging",
                            "disk",
                            "ram"
                        ]
                    }

                ],

                Hard: [

                    {
                        question:
                            "Explain deadlock in operating systems.",
                        topic: "Deadlocks",
                        keywords: [
                            "deadlock",
                            "process",
                            "resource",
                            "wait",
                            "circular"
                        ]
                    },

                    {
                        question:
                            "Explain paging in operating systems.",
                        topic: "Memory Management",
                        keywords: [
                            "paging",
                            "page",
                            "memory",
                            "frame",
                            "virtual"
                        ]
                    },

                    {
                        question:
                            "What is synchronization in operating systems?",
                        topic: "Process Synchronization",
                        keywords: [
                            "synchronization",
                            "process",
                            "shared",
                            "resource",
                            "mutex",
                            "semaphore"
                        ]
                    }

                ]

            },


            // =================================================
            // COMPUTER NETWORKS
            // =================================================

            "Computer Networks": {

                Easy: [

                    {
                        question:
                            "What is a computer network?",
                        topic: "Networking Basics",
                        keywords: [
                            "network",
                            "computer",
                            "communication",
                            "devices",
                            "data"
                        ]
                    },

                    {
                        question:
                            "What is an IP address?",
                        topic: "IP Addressing",
                        keywords: [
                            "ip address",
                            "network",
                            "device",
                            "identify",
                            "address"
                        ]
                    },

                    {
                        question:
                            "What is the difference between LAN and WAN?",
                        topic: "Network Types",
                        keywords: [
                            "lan",
                            "wan",
                            "network",
                            "local",
                            "wide"
                        ]
                    }

                ],

                Medium: [

                    {
                        question:
                            "Explain the OSI model.",
                        topic: "OSI Model",
                        keywords: [
                            "osi",
                            "layers",
                            "physical",
                            "transport",
                            "application"
                        ]
                    },

                    {
                        question:
                            "What is TCP and UDP?",
                        topic: "Transport Layer",
                        keywords: [
                            "tcp",
                            "udp",
                            "transport",
                            "connection",
                            "reliable"
                        ]
                    },

                    {
                        question:
                            "What is DNS?",
                        topic: "Network Services",
                        keywords: [
                            "dns",
                            "domain",
                            "name",
                            "ip address",
                            "server"
                        ]
                    }

                ],

                Hard: [

                    {
                        question:
                            "Explain the TCP three-way handshake.",
                        topic: "TCP",
                        keywords: [
                            "tcp",
                            "handshake",
                            "syn",
                            "ack",
                            "connection"
                        ]
                    },

                    {
                        question:
                            "What is subnetting?",
                        topic: "IP Addressing",
                        keywords: [
                            "subnet",
                            "network",
                            "ip",
                            "address",
                            "mask"
                        ]
                    },

                    {
                        question:
                            "Explain HTTP and HTTPS.",
                        topic: "Web Protocols",
                        keywords: [
                            "http",
                            "https",
                            "protocol",
                            "secure",
                            "encryption"
                        ]
                    }

                ]

            },


            // =================================================
            // DATA STRUCTURES
            // =================================================

            "Data Structures": {

                Easy: [

                    {
                        question:
                            "What is an array?",
                        topic: "Arrays",
                        keywords: [
                            "array",
                            "elements",
                            "index",
                            "memory"
                        ]
                    },

                    {
                        question:
                            "What is a linked list?",
                        topic: "Linked List",
                        keywords: [
                            "linked list",
                            "node",
                            "data",
                            "next",
                            "pointer"
                        ]
                    },

                    {
                        question:
                            "What is a stack?",
                        topic: "Stack",
                        keywords: [
                            "stack",
                            "lifo",
                            "push",
                            "pop"
                        ]
                    }

                ],

                Medium: [

                    {
                        question:
                            "What is a queue?",
                        topic: "Queue",
                        keywords: [
                            "queue",
                            "fifo",
                            "enqueue",
                            "dequeue"
                        ]
                    },

                    {
                        question:
                            "What is a binary tree?",
                        topic: "Trees",
                        keywords: [
                            "binary tree",
                            "node",
                            "left",
                            "right"
                        ]
                    },

                    {
                        question:
                            "What is a hash table?",
                        topic: "Hashing",
                        keywords: [
                            "hash",
                            "table",
                            "key",
                            "value",
                            "collision"
                        ]
                    }

                ],

                Hard: [

                    {
                        question:
                            "What is a binary search tree?",
                        topic: "Trees",
                        keywords: [
                            "binary search tree",
                            "bst",
                            "left",
                            "right",
                            "node"
                        ]
                    },

                    {
                        question:
                            "What is graph traversal?",
                        topic: "Graphs",
                        keywords: [
                            "graph",
                            "bfs",
                            "dfs",
                            "vertex",
                            "edge"
                        ]
                    },

                    {
                        question:
                            "What is a priority queue?",
                        topic: "Heap",
                        keywords: [
                            "priority queue",
                            "heap",
                            "priority",
                            "element"
                        ]
                    }

                ]

            },


            // =================================================
            // ALGORITHMS
            // =================================================

            Algorithms: {

                Easy: [

                    {
                        question:
                            "What is linear search?",
                        topic: "Searching",
                        keywords: [
                            "linear search",
                            "search",
                            "element",
                            "array",
                            "sequential"
                        ]
                    },

                    {
                        question:
                            "What is sorting?",
                        topic: "Sorting",
                        keywords: [
                            "sorting",
                            "order",
                            "elements",
                            "ascending",
                            "descending"
                        ]
                    },

                    {
                        question:
                            "What is the time complexity of linear search?",
                        topic: "Complexity",
                        keywords: [
                            "o(n)",
                            "linear",
                            "time complexity"
                        ]
                    }

                ],

                Medium: [

                    {
                        question:
                            "Explain binary search.",
                        topic: "Searching",
                        keywords: [
                            "binary search",
                            "sorted",
                            "middle",
                            "divide",
                            "o(log n)"
                        ]
                    },

                    {
                        question:
                            "What is merge sort?",
                        topic: "Sorting",
                        keywords: [
                            "merge sort",
                            "divide",
                            "merge",
                            "sorting"
                        ]
                    },

                    {
                        question:
                            "What is recursion?",
                        topic: "Recursion",
                        keywords: [
                            "recursion",
                            "function",
                            "calls",
                            "base case"
                        ]
                    }

                ],

                Hard: [

                    {
                        question:
                            "What is dynamic programming?",
                        topic: "Dynamic Programming",
                        keywords: [
                            "dynamic programming",
                            "subproblem",
                            "memoization",
                            "tabulation",
                            "optimal"
                        ]
                    },

                    {
                        question:
                            "Explain greedy algorithms.",
                        topic: "Greedy Algorithms",
                        keywords: [
                            "greedy",
                            "local",
                            "optimal",
                            "choice"
                        ]
                    },

                    {
                        question:
                            "What is backtracking?",
                        topic: "Backtracking",
                        keywords: [
                            "backtracking",
                            "recursion",
                            "choice",
                            "solution",
                            "backtrack"
                        ]
                    }

                ]

            },


            // =================================================
            // SOFTWARE ENGINEERING
            // =================================================

            "Software Engineering": {

                Easy: [

                    {
                        question:
                            "What is software engineering?",
                        topic: "SE Basics",
                        keywords: [
                            "software",
                            "engineering",
                            "development",
                            "process"
                        ]
                    },

                    {
                        question:
                            "What is SDLC?",
                        topic: "SDLC",
                        keywords: [
                            "sdlc",
                            "software",
                            "development",
                            "life cycle"
                        ]
                    },

                    {
                        question:
                            "What is software testing?",
                        topic: "Software Testing",
                        keywords: [
                            "testing",
                            "software",
                            "bugs",
                            "errors",
                            "quality"
                        ]
                    }

                ],

                Medium: [

                    {
                        question:
                            "What is the Agile methodology?",
                        topic: "Agile",
                        keywords: [
                            "agile",
                            "iterative",
                            "incremental",
                            "sprint"
                        ]
                    },

                    {
                        question:
                            "What is the difference between verification and validation?",
                        topic: "Software Testing",
                        keywords: [
                            "verification",
                            "validation",
                            "requirements",
                            "testing"
                        ]
                    },

                    {
                        question:
                            "What is the Waterfall model?",
                        topic: "SDLC",
                        keywords: [
                            "waterfall",
                            "sequential",
                            "phases",
                            "development"
                        ]
                    }

                ],

                Hard: [

                    {
                        question:
                            "What is the difference between Agile and Waterfall?",
                        topic: "Development Models",
                        keywords: [
                            "agile",
                            "waterfall",
                            "iterative",
                            "sequential",
                            "flexible"
                        ]
                    },

                    {
                        question:
                            "What is software quality assurance?",
                        topic: "Quality Assurance",
                        keywords: [
                            "quality",
                            "assurance",
                            "process",
                            "testing",
                            "standards"
                        ]
                    },

                    {
                        question:
                            "Explain different levels of software testing.",
                        topic: "Software Testing",
                        keywords: [
                            "unit",
                            "integration",
                            "system",
                            "acceptance",
                            "testing"
                        ]
                    }

                ]

            },


            // =================================================
            // CLOUD COMPUTING
            // =================================================

            "Cloud Computing": {

                Easy: [

                    {
                        question:
                            "What is cloud computing?",
                        topic: "Cloud Basics",
                        keywords: [
                            "cloud",
                            "internet",
                            "computing",
                            "resources",
                            "server"
                        ]
                    },

                    {
                        question:
                            "What is IaaS?",
                        topic: "Cloud Service Models",
                        keywords: [
                            "iaas",
                            "infrastructure",
                            "service",
                            "virtual",
                            "server"
                        ]
                    },

                    {
                        question:
                            "What is SaaS?",
                        topic: "Cloud Service Models",
                        keywords: [
                            "saas",
                            "software",
                            "service",
                            "application",
                            "internet"
                        ]
                    }

                ],

                Medium: [

                    {
                        question:
                            "What is PaaS?",
                        topic: "Cloud Service Models",
                        keywords: [
                            "paas",
                            "platform",
                            "service",
                            "application",
                            "development"
                        ]
                    },

                    {
                        question:
                            "What are the benefits of cloud computing?",
                        topic: "Cloud Benefits",
                        keywords: [
                            "scalability",
                            "cost",
                            "availability",
                            "flexibility",
                            "resources"
                        ]
                    },

                    {
                        question:
                            "What is virtualization?",
                        topic: "Virtualization",
                        keywords: [
                            "virtualization",
                            "virtual machine",
                            "hardware",
                            "resource"
                        ]
                    }

                ],

                Hard: [

                    {
                        question:
                            "What is cloud scalability?",
                        topic: "Cloud Architecture",
                        keywords: [
                            "scalability",
                            "resources",
                            "load",
                            "increase",
                            "decrease"
                        ]
                    },

                    {
                        question:
                            "What is load balancing?",
                        topic: "Cloud Architecture",
                        keywords: [
                            "load balancing",
                            "server",
                            "traffic",
                            "distribution",
                            "load"
                        ]
                    },

                    {
                        question:
                            "What is the difference between public and private cloud?",
                        topic: "Cloud Deployment",
                        keywords: [
                            "public",
                            "private",
                            "cloud",
                            "organization",
                            "resources"
                        ]
                    }

                ]

            },


            // =================================================
            // CYBER SECURITY
            // =================================================

            "Cyber Security": {

                Easy: [

                    {
                        question:
                            "What is cyber security?",
                        topic: "Security Basics",
                        keywords: [
                            "cyber security",
                            "security",
                            "data",
                            "system",
                            "protection"
                        ]
                    },

                    {
                        question:
                            "What is authentication?",
                        topic: "Authentication",
                        keywords: [
                            "authentication",
                            "identity",
                            "user",
                            "password",
                            "verify"
                        ]
                    },

                    {
                        question:
                            "What is encryption?",
                        topic: "Encryption",
                        keywords: [
                            "encryption",
                            "data",
                            "security",
                            "key",
                            "cipher"
                        ]
                    }

                ],

                Medium: [

                    {
                        question:
                            "What is phishing?",
                        topic: "Cyber Attacks",
                        keywords: [
                            "phishing",
                            "email",
                            "attack",
                            "fake",
                            "information"
                        ]
                    },

                    {
                        question:
                            "What is a firewall?",
                        topic: "Network Security",
                        keywords: [
                            "firewall",
                            "network",
                            "traffic",
                            "security",
                            "filter"
                        ]
                    },

                    {
                        question:
                            "What is authorization?",
                        topic: "Authentication & Authorization",
                        keywords: [
                            "authorization",
                            "access",
                            "permission",
                            "user",
                            "resource"
                        ]
                    }

                ],

                Hard: [

                    {
                        question:
                            "What is SQL injection?",
                        topic: "Web Security",
                        keywords: [
                            "sql injection",
                            "database",
                            "query",
                            "input",
                            "attack"
                        ]
                    },

                    {
                        question:
                            "What is cross-site scripting?",
                        topic: "Web Security",
                        keywords: [
                            "xss",
                            "cross site scripting",
                            "script",
                            "browser",
                            "attack"
                        ]
                    },

                    {
                        question:
                            "What is two-factor authentication?",
                        topic: "Authentication",
                        keywords: [
                            "two factor",
                            "authentication",
                            "password",
                            "verification",
                            "otp"
                        ]
                    }

                ]

            },


            // =================================================
            // IOT
            // =================================================

            IoT: {

                Easy: [

                    {
                        question:
                            "What is IoT?",
                        topic: "IoT Basics",
                        keywords: [
                            "iot",
                            "internet",
                            "things",
                            "devices",
                            "sensors"
                        ]
                    },

                    {
                        question:
                            "What is a sensor in IoT?",
                        topic: "IoT Sensors",
                        keywords: [
                            "sensor",
                            "data",
                            "device",
                            "measure",
                            "environment"
                        ]
                    },

                    {
                        question:
                            "What is an actuator?",
                        topic: "IoT Devices",
                        keywords: [
                            "actuator",
                            "device",
                            "action",
                            "control",
                            "physical"
                        ]
                    }

                ],

                Medium: [

                    {
                        question:
                            "Explain the architecture of IoT.",
                        topic: "IoT Architecture",
                        keywords: [
                            "iot",
                            "sensor",
                            "network",
                            "processing",
                            "application"
                        ]
                    },

                    {
                        question:
                            "What communication protocols are used in IoT?",
                        topic: "IoT Communication",
                        keywords: [
                            "mqtt",
                            "http",
                            "coap",
                            "protocol",
                            "communication"
                        ]
                    },

                    {
                        question:
                            "What is an IoT gateway?",
                        topic: "IoT Architecture",
                        keywords: [
                            "gateway",
                            "iot",
                            "devices",
                            "network",
                            "data"
                        ]
                    }

                ],

                Hard: [

                    {
                        question:
                            "What are the security challenges in IoT?",
                        topic: "IoT Security",
                        keywords: [
                            "security",
                            "iot",
                            "device",
                            "authentication",
                            "encryption"
                        ]
                    },

                    {
                        question:
                            "What is edge computing in IoT?",
                        topic: "Edge Computing",
                        keywords: [
                            "edge",
                            "computing",
                            "iot",
                            "device",
                            "latency"
                        ]
                    },

                    {
                        question:
                            "Explain IoT data processing.",
                        topic: "IoT Data Processing",
                        keywords: [
                            "data",
                            "processing",
                            "iot",
                            "cloud",
                            "edge"
                        ]
                    }

                ]

            }

        },


        // =====================================================
        // CODING
        // =====================================================

        Coding: {

            Arrays: {

                Easy: [

                    {
                        question:
                            "Write a program to find the largest element in an array.",
                        topic: "Array Basics",
                        keywords: [
                            "array",
                            "largest",
                            "maximum",
                            "loop",
                            "compare"
                        ]
                    },

                    {
                        question:
                            "Find the sum of all elements in an array.",
                        topic: "Array Basics",
                        keywords: [
                            "array",
                            "sum",
                            "loop",
                            "elements",
                            "+"
                        ]
                    },

                    {
                        question:
                            "Find the smallest element in an array.",
                        topic: "Array Basics",
                        keywords: [
                            "array",
                            "smallest",
                            "minimum",
                            "loop",
                            "compare"
                        ]
                    }

                ],

                Medium: [

                    {
                        question:
                            "Find the second largest element in an array.",
                        topic: "Array Problems",
                        keywords: [
                            "array",
                            "largest",
                            "second",
                            "maximum",
                            "loop"
                        ]
                    },

                    {
                        question:
                            "Find the pair of elements whose sum equals a given target.",
                        topic: "Two Sum",
                        keywords: [
                            "array",
                            "pair",
                            "sum",
                            "target",
                            "hashmap",
                            "twosum"
                        ]
                    },

                    {
                        question:
                            "Remove duplicate elements from an array.",
                        topic: "Array Problems",
                        keywords: [
                            "array",
                            "duplicate",
                            "unique",
                            "set",
                            "hashset"
                        ]
                    }

                ],

                Hard: [

                    {
                        question:
                            "Solve the Two Sum problem using an efficient approach.",
                        topic: "Two Sum",
                        keywords: [
                            "twosum",
                            "array",
                            "target",
                            "hashmap",
                            "complement",
                            "o(n)"
                        ]
                    },

                    {
                        question:
                            "Find the maximum subarray sum.",
                        topic: "Kadane's Algorithm",
                        keywords: [
                            "maximum",
                            "subarray",
                            "sum",
                            "kadane",
                            "array"
                        ]
                    },

                    {
                        question:
                            "Find the intersection of two arrays.",
                        topic: "Array Problems",
                        keywords: [
                            "array",
                            "intersection",
                            "common",
                            "set",
                            "elements"
                        ]
                    }

                ]

            },


            Strings: {

                Easy: [

                    {
                        question:
                            "Write a program to reverse a string.",
                        topic: "String Basics",
                        keywords: [
                            "string",
                            "reverse",
                            "loop",
                            "character",
                            "char"
                        ]
                    },

                    {
                        question:
                            "Check whether a string is a palindrome.",
                        topic: "Palindrome",
                        keywords: [
                            "string",
                            "palindrome",
                            "reverse",
                            "character",
                            "compare"
                        ]
                    },

                    {
                        question:
                            "Find the length of a string.",
                        topic: "String Basics",
                        keywords: [
                            "string",
                            "length",
                            "characters",
                            "length()"
                        ]
                    }

                ],

                Medium: [

                    {
                        question:
                            "Find the first non-repeating character in a string.",
                        topic: "Character Frequency",
                        keywords: [
                            "string",
                            "character",
                            "frequency",
                            "count",
                            "hashmap"
                        ]
                    },

                    {
                        question:
                            "Count the frequency of each character in a string.",
                        topic: "Character Frequency",
                        keywords: [
                            "string",
                            "character",
                            "frequency",
                            "count",
                            "hashmap"
                        ]
                    },

                    {
                        question:
                            "Check whether two strings are anagrams.",
                        topic: "Anagrams",
                        keywords: [
                            "string",
                            "anagram",
                            "characters",
                            "sort",
                            "frequency"
                        ]
                    }

                ],

                Hard: [

                    {
                        question:
                            "Find the longest substring without repeating characters.",
                        topic: "Sliding Window",
                        keywords: [
                            "substring",
                            "string",
                            "sliding window",
                            "hashmap",
                            "set",
                            "unique"
                        ]
                    },

                    {
                        question:
                            "Find the longest palindromic substring.",
                        topic: "Palindrome",
                        keywords: [
                            "palindrome",
                            "substring",
                            "string",
                            "expand",
                            "center"
                        ]
                    },

                    {
                        question:
                            "Find the first occurrence of a pattern in a string.",
                        topic: "String Searching",
                        keywords: [
                            "string",
                            "pattern",
                            "search",
                            "index",
                            "substring"
                        ]
                    }

                ]

            },


            "Linked List": {

                Easy: [

                    {
                        question:
                            "What is a linked list?",
                        topic: "Linked List Basics",
                        keywords: [
                            "linked list",
                            "node",
                            "data",
                            "next",
                            "pointer"
                        ]
                    },

                    {
                        question:
                            "How do you insert a node at the beginning of a linked list?",
                        topic: "Linked List Operations",
                        keywords: [
                            "node",
                            "insert",
                            "head",
                            "next",
                            "linked list"
                        ]
                    },

                    {
                        question:
                            "How do you traverse a linked list?",
                        topic: "Linked List Traversal",
                        keywords: [
                            "linked list",
                            "traverse",
                            "node",
                            "next",
                            "loop"
                        ]
                    }

                ],

                Medium: [

                    {
                        question:
                            "Reverse a linked list.",
                        topic: "Linked List Reversal",
                        keywords: [
                            "linked list",
                            "reverse",
                            "node",
                            "next",
                            "previous"
                        ]
                    },

                    {
                        question:
                            "Find the middle element of a linked list.",
                        topic: "Linked List",
                        keywords: [
                            "linked list",
                            "middle",
                            "slow",
                            "fast",
                            "pointer"
                        ]
                    },

                    {
                        question:
                            "Detect a cycle in a linked list.",
                        topic: "Linked List Cycle",
                        keywords: [
                            "cycle",
                            "linked list",
                            "slow",
                            "fast",
                            "pointer"
                        ]
                    }

                ],

                Hard: [

                    {
                        question:
                            "Merge two sorted linked lists.",
                        topic: "Linked List Merging",
                        keywords: [
                            "linked list",
                            "merge",
                            "sorted",
                            "node",
                            "pointer"
                        ]
                    },

                    {
                        question:
                            "Find the starting point of a cycle in a linked list.",
                        topic: "Linked List Cycle",
                        keywords: [
                            "cycle",
                            "linked list",
                            "slow",
                            "fast",
                            "pointer"
                        ]
                    },

                    {
                        question:
                            "Remove the nth node from the end of a linked list.",
                        topic: "Linked List",
                        keywords: [
                            "linked list",
                            "nth",
                            "node",
                            "two pointer",
                            "fast",
                            "slow"
                        ]
                    }

                ]

            },


            "Stack & Queue": {

                Easy: [

                    {
                        question:
                            "What is a stack?",
                        topic: "Stack",
                        keywords: [
                            "stack",
                            "lifo",
                            "push",
                            "pop"
                        ]
                    },

                    {
                        question:
                            "What is a queue?",
                        topic: "Queue",
                        keywords: [
                            "queue",
                            "fifo",
                            "enqueue",
                            "dequeue"
                        ]
                    },

                    {
                        question:
                            "What is the difference between stack and queue?",
                        topic: "Stack & Queue",
                        keywords: [
                            "stack",
                            "queue",
                            "lifo",
                            "fifo"
                        ]
                    }

                ],

                Medium: [

                    {
                        question:
                            "Implement a stack using an array.",
                        topic: "Stack Implementation",
                        keywords: [
                            "stack",
                            "array",
                            "push",
                            "pop",
                            "top"
                        ]
                    },

                    {
                        question:
                            "Implement a queue using an array.",
                        topic: "Queue Implementation",
                        keywords: [
                            "queue",
                            "array",
                            "enqueue",
                            "dequeue",
                            "front"
                        ]
                    },

                    {
                        question:
                            "What is a circular queue?",
                        topic: "Circular Queue",
                        keywords: [
                            "circular queue",
                            "queue",
                            "front",
                            "rear",
                            "circular"
                        ]
                    }

                ],

                Hard: [

                    {
                        question:
                            "Implement a queue using two stacks.",
                        topic: "Stack & Queue",
                        keywords: [
                            "queue",
                            "stack",
                            "two stacks",
                            "enqueue",
                            "dequeue"
                        ]
                    },

                    {
                        question:
                            "Design a stack that supports retrieving the minimum element.",
                        topic: "Advanced Stack",
                        keywords: [
                            "stack",
                            "minimum",
                            "min",
                            "push",
                            "pop"
                        ]
                    },

                    {
                        question:
                            "Evaluate a postfix expression using a stack.",
                        topic: "Stack Applications",
                        keywords: [
                            "postfix",
                            "stack",
                            "operand",
                            "operator",
                            "push",
                            "pop"
                        ]
                    }

                ]

            },


            "Searching & Sorting": {

                Easy: [

                    {
                        question:
                            "Write a program for linear search.",
                        topic: "Linear Search",
                        keywords: [
                            "linear",
                            "search",
                            "array",
                            "loop",
                            "element"
                        ]
                    },

                    {
                        question:
                            "Write a program for bubble sort.",
                        topic: "Bubble Sort",
                        keywords: [
                            "bubble",
                            "sort",
                            "array",
                            "swap",
                            "loop"
                        ]
                    },

                    {
                        question:
                            "What is binary search?",
                        topic: "Binary Search",
                        keywords: [
                            "binary",
                            "search",
                            "sorted",
                            "middle",
                            "divide"
                        ]
                    }

                ],

                Medium: [

                    {
                        question:
                            "Implement binary search.",
                        topic: "Binary Search",
                        keywords: [
                            "binary",
                            "search",
                            "sorted",
                            "middle",
                            "o(log n)"
                        ]
                    },

                    {
                        question:
                            "Explain merge sort.",
                        topic: "Merge Sort",
                        keywords: [
                            "merge sort",
                            "divide",
                            "merge",
                            "sort"
                        ]
                    },

                    {
                        question:
                            "Explain quick sort.",
                        topic: "Quick Sort",
                        keywords: [
                            "quick sort",
                            "pivot",
                            "partition",
                            "sort"
                        ]
                    }

                ],

                Hard: [

                    {
                        question:
                            "What is the time complexity of merge sort?",
                        topic: "Merge Sort",
                        keywords: [
                            "merge sort",
                            "o(n log n)",
                            "time complexity",
                            "divide"
                        ]
                    },

                    {
                        question:
                            "Explain quick sort partitioning.",
                        topic: "Quick Sort",
                        keywords: [
                            "quick sort",
                            "partition",
                            "pivot",
                            "left",
                            "right"
                        ]
                    },

                    {
                        question:
                            "Compare quick sort and merge sort.",
                        topic: "Sorting Algorithms",
                        keywords: [
                            "quick sort",
                            "merge sort",
                            "complexity",
                            "pivot",
                            "memory"
                        ]
                    }

                ]

            },


            "Trees": {

                Easy: [

                    {
                        question:
                            "What is a binary tree?",
                        topic: "Binary Trees",
                        keywords: [
                            "binary tree",
                            "node",
                            "left",
                            "right"
                        ]
                    },

                    {
                        question:
                            "What is tree traversal?",
                        topic: "Tree Traversal",
                        keywords: [
                            "tree",
                            "traversal",
                            "inorder",
                            "preorder",
                            "postorder"
                        ]
                    },

                    {
                        question:
                            "What is the root node of a tree?",
                        topic: "Tree Basics",
                        keywords: [
                            "root",
                            "tree",
                            "node",
                            "top"
                        ]
                    }

                ],

                Medium: [

                    {
                        question:
                            "Explain inorder traversal.",
                        topic: "Tree Traversal",
                        keywords: [
                            "inorder",
                            "left",
                            "root",
                            "right",
                            "tree"
                        ]
                    },

                    {
                        question:
                            "What is a binary search tree?",
                        topic: "Binary Search Tree",
                        keywords: [
                            "binary search tree",
                            "bst",
                            "left",
                            "right",
                            "node"
                        ]
                    },

                    {
                        question:
                            "Find the height of a binary tree.",
                        topic: "Binary Trees",
                        keywords: [
                            "height",
                            "binary tree",
                            "node",
                            "recursion"
                        ]
                    }

                ],

                Hard: [

                    {
                        question:
                            "Find the lowest common ancestor of two nodes.",
                        topic: "Tree Algorithms",
                        keywords: [
                            "lowest common ancestor",
                            "tree",
                            "node",
                            "ancestor"
                        ]
                    },

                    {
                        question:
                            "Perform level order traversal of a binary tree.",
                        topic: "Tree Traversal",
                        keywords: [
                            "level order",
                            "binary tree",
                            "queue",
                            "traversal"
                        ]
                    },

                    {
                        question:
                            "Check whether a binary tree is balanced.",
                        topic: "Tree Algorithms",
                        keywords: [
                            "balanced",
                            "binary tree",
                            "height",
                            "left",
                            "right"
                        ]
                    }

                ]

            },


            "Graphs": {

                Easy: [

                    {
                        question:
                            "What is a graph?",
                        topic: "Graph Basics",
                        keywords: [
                            "graph",
                            "vertex",
                            "edge",
                            "node"
                        ]
                    },

                    {
                        question:
                            "What is BFS?",
                        topic: "Graph Traversal",
                        keywords: [
                            "bfs",
                            "breadth",
                            "queue",
                            "graph",
                            "traversal"
                        ]
                    },

                    {
                        question:
                            "What is DFS?",
                        topic: "Graph Traversal",
                        keywords: [
                            "dfs",
                            "depth",
                            "stack",
                            "recursion",
                            "graph"
                        ]
                    }

                ],

                Medium: [

                    {
                        question:
                            "Implement BFS traversal.",
                        topic: "BFS",
                        keywords: [
                            "bfs",
                            "queue",
                            "visited",
                            "graph",
                            "traversal"
                        ]
                    },

                    {
                        question:
                            "Implement DFS traversal.",
                        topic: "DFS",
                        keywords: [
                            "dfs",
                            "stack",
                            "recursion",
                            "visited",
                            "graph"
                        ]
                    },

                    {
                        question:
                            "How do you detect a cycle in a graph?",
                        topic: "Graph Cycles",
                        keywords: [
                            "cycle",
                            "graph",
                            "visited",
                            "dfs",
                            "bfs"
                        ]
                    }

                ],

                Hard: [

                    {
                        question:
                            "Explain Dijkstra's shortest path algorithm.",
                        topic: "Shortest Path",
                        keywords: [
                            "dijkstra",
                            "shortest",
                            "path",
                            "distance",
                            "priority queue"
                        ]
                    },

                    {
                        question:
                            "What is a minimum spanning tree?",
                        topic: "Minimum Spanning Tree",
                        keywords: [
                            "minimum spanning tree",
                            "mst",
                            "edge",
                            "weight",
                            "graph"
                        ]
                    },

                    {
                        question:
                            "Explain topological sorting.",
                        topic: "Topological Sort",
                        keywords: [
                            "topological",
                            "sort",
                            "directed",
                            "graph",
                            "indegree"
                        ]
                    }

                ]

            },


            "Dynamic Programming": {

                Easy: [

                    {
                        question:
                            "What is dynamic programming?",
                        topic: "DP Basics",
                        keywords: [
                            "dynamic programming",
                            "subproblem",
                            "overlapping",
                            "optimal"
                        ]
                    },

                    {
                        question:
                            "What is memoization?",
                        topic: "Memoization",
                        keywords: [
                            "memoization",
                            "cache",
                            "subproblem",
                            "recursion"
                        ]
                    },

                    {
                        question:
                            "What is tabulation?",
                        topic: "Tabulation",
                        keywords: [
                            "tabulation",
                            "table",
                            "bottom up",
                            "dynamic programming"
                        ]
                    }

                ],

                Medium: [

                    {
                        question:
                            "Solve the climbing stairs problem using dynamic programming.",
                        topic: "DP Problems",
                        keywords: [
                            "climbing stairs",
                            "dynamic programming",
                            "dp",
                            "previous"
                        ]
                    },

                    {
                        question:
                            "Explain the Fibonacci problem using dynamic programming.",
                        topic: "DP Problems",
                        keywords: [
                            "fibonacci",
                            "dynamic programming",
                            "dp",
                            "memoization"
                        ]
                    },

                    {
                        question:
                            "What is the difference between memoization and tabulation?",
                        topic: "DP Techniques",
                        keywords: [
                            "memoization",
                            "tabulation",
                            "top down",
                            "bottom up"
                        ]
                    }

                ],

                Hard: [

                    {
                        question:
                            "Explain the 0/1 Knapsack problem.",
                        topic: "Knapsack",
                        keywords: [
                            "knapsack",
                            "dynamic programming",
                            "weight",
                            "value",
                            "capacity"
                        ]
                    },

                    {
                        question:
                            "Explain the Longest Common Subsequence problem.",
                        topic: "LCS",
                        keywords: [
                            "longest common subsequence",
                            "lcs",
                            "dynamic programming",
                            "subsequence"
                        ]
                    },

                    {
                        question:
                            "What is the difference between dynamic programming and greedy algorithms?",
                        topic: "DP vs Greedy",
                        keywords: [
                            "dynamic programming",
                            "greedy",
                            "optimal",
                            "subproblem",
                            "choice"
                        ]
                    }

                ]

            }

        },


        // =====================================================
        // HR
        // =====================================================

        HR: {

            Introduction: {

                Easy: [

                    {
                        question:
                            "Tell me about yourself.",
                        topic: "Introduction",
                        keywords: [
                            "education",
                            "skills",
                            "project",
                            "experience",
                            "career",
                            "goal"
                        ]
                    },

                    {
                        question:
                            "Tell me about your educational background.",
                        topic: "Education",
                        keywords: [
                            "education",
                            "degree",
                            "college",
                            "skills",
                            "learning"
                        ]
                    },

                    {
                        question:
                            "What are your interests?",
                        topic: "Personal Introduction",
                        keywords: [
                            "interest",
                            "hobby",
                            "learning",
                            "skills",
                            "activity"
                        ]
                    }

                ],

                Medium: [

                    {
                        question:
                            "How would you introduce yourself in a professional interview?",
                        topic: "Professional Introduction",
                        keywords: [
                            "education",
                            "skills",
                            "project",
                            "experience",
                            "career"
                        ]
                    },

                    {
                        question:
                            "What are your career interests?",
                        topic: "Career Interests",
                        keywords: [
                            "career",
                            "interest",
                            "skills",
                            "growth",
                            "goal"
                        ]
                    },

                    {
                        question:
                            "What makes you different from other candidates?",
                        topic: "Self Introduction",
                        keywords: [
                            "skills",
                            "unique",
                            "experience",
                            "learning",
                            "contribution"
                        ]
                    }

                ],

                Hard: [

                    {
                        question:
                            "Give a brief professional introduction highlighting your strengths.",
                        topic: "Professional Introduction",
                        keywords: [
                            "experience",
                            "skills",
                            "strengths",
                            "project",
                            "career"
                        ]
                    },

                    {
                        question:
                            "How would you explain your career journey?",
                        topic: "Career Journey",
                        keywords: [
                            "career",
                            "education",
                            "experience",
                            "growth",
                            "learning"
                        ]
                    },

                    {
                        question:
                            "Why should an organization invest in your development?",
                        topic: "Career Development",
                        keywords: [
                            "learning",
                            "skills",
                            "growth",
                            "contribution",
                            "organization"
                        ]
                    }

                ]

            },


            Career: {

                Easy: [

                    {
                        question:
                            "Where do you see yourself in five years?",
                        topic: "Career Goals",
                        keywords: [
                            "career",
                            "growth",
                            "skills",
                            "leadership",
                            "experience",
                            "company"
                        ]
                    },

                    {
                        question:
                            "What are your career goals?",
                        topic: "Career Goals",
                        keywords: [
                            "career",
                            "goal",
                            "growth",
                            "skills",
                            "experience"
                        ]
                    },

                    {
                        question:
                            "Why did you choose your career?",
                        topic: "Career Motivation",
                        keywords: [
                            "career",
                            "interest",
                            "skills",
                            "passion",
                            "goal"
                        ]
                    }

                ],

                Medium: [

                    {
                        question:
                            "Why do you want to join our company?",
                        topic: "Career Motivation",
                        keywords: [
                            "company",
                            "growth",
                            "skills",
                            "culture",
                            "opportunity",
                            "career"
                        ]
                    },

                    {
                        question:
                            "What type of role are you looking for?",
                        topic: "Career Goals",
                        keywords: [
                            "role",
                            "skills",
                            "career",
                            "growth",
                            "opportunity"
                        ]
                    },

                    {
                        question:
                            "What motivates you at work?",
                        topic: "Motivation",
                        keywords: [
                            "motivation",
                            "learning",
                            "growth",
                            "achievement",
                            "challenge"
                        ]
                    }

                ],

                Hard: [

                    {
                        question:
                            "Why should we choose you over other candidates?",
                        topic: "Career & Motivation",
                        keywords: [
                            "skills",
                            "unique",
                            "learning",
                            "team",
                            "contribution",
                            "experience"
                        ]
                    },

                    {
                        question:
                            "Why should we hire you?",
                        topic: "Career & Motivation",
                        keywords: [
                            "skills",
                            "company",
                            "learning",
                            "contribution",
                            "team",
                            "experience"
                        ]
                    },

                    {
                        question:
                            "How will you contribute to our organization?",
                        topic: "Career & Contribution",
                        keywords: [
                            "skills",
                            "contribution",
                            "team",
                            "learning",
                            "experience"
                        ]
                    }

                ]

            },


            Teamwork: {

                Easy: [

                    {
                        question:
                            "What does teamwork mean to you?",
                        topic: "Teamwork",
                        keywords: [
                            "team",
                            "communication",
                            "cooperation",
                            "support",
                            "goal"
                        ]
                    },

                    {
                        question:
                            "Do you prefer working alone or in a team?",
                        topic: "Teamwork",
                        keywords: [
                            "team",
                            "alone",
                            "communication",
                            "collaboration",
                            "work"
                        ]
                    },

                    {
                        question:
                            "What makes a good team?",
                        topic: "Teamwork",
                        keywords: [
                            "team",
                            "communication",
                            "trust",
                            "respect",
                            "goal"
                        ]
                    }

                ],

                Medium: [

                    {
                        question:
                            "Tell me about a successful team project.",
                        topic: "Team Projects",
                        keywords: [
                            "team",
                            "project",
                            "communication",
                            "result",
                            "contribution"
                        ]
                    },

                    {
                        question:
                            "How do you support a team member who is struggling?",
                        topic: "Team Support",
                        keywords: [
                            "team",
                            "support",
                            "communication",
                            "help",
                            "solution"
                        ]
                    },

                    {
                        question:
                            "How do you handle differences of opinion in a team?",
                        topic: "Team Communication",
                        keywords: [
                            "communication",
                            "discuss",
                            "respect",
                            "team",
                            "solution"
                        ]
                    }

                ],

                Hard: [

                    {
                        question:
                            "How would you handle a conflict with a team member?",
                        topic: "Conflict Management",
                        keywords: [
                            "communication",
                            "listen",
                            "discuss",
                            "solution",
                            "team",
                            "respect"
                        ]
                    },

                    {
                        question:
                            "Tell me about a difficult team situation you handled.",
                        topic: "Conflict Management",
                        keywords: [
                            "team",
                            "problem",
                            "communication",
                            "solution",
                            "result"
                        ]
                    },

                    {
                        question:
                            "How would you deal with a team member who is not contributing?",
                        topic: "Team Management",
                        keywords: [
                            "team",
                            "communication",
                            "discuss",
                            "support",
                            "contribution"
                        ]
                    }

                ]

            },


            Communication: {

                Easy: [

                    {
                        question:
                            "What makes communication effective?",
                        topic: "Communication",
                        keywords: [
                            "communication",
                            "listen",
                            "clear",
                            "understand",
                            "message"
                        ]
                    },

                    {
                        question:
                            "What are your communication strengths?",
                        topic: "Communication Skills",
                        keywords: [
                            "communication",
                            "listen",
                            "clear",
                            "teamwork"
                        ]
                    },

                    {
                        question:
                            "How do you handle feedback?",
                        topic: "Feedback",
                        keywords: [
                            "feedback",
                            "listen",
                            "improve",
                            "learning",
                            "communication"
                        ]
                    }

                ],

                Medium: [

                    {
                        question:
                            "How do you explain a technical concept to a non-technical person?",
                        topic: "Technical Communication",
                        keywords: [
                            "simple",
                            "communication",
                            "example",
                            "understand",
                            "explain"
                        ]
                    },

                    {
                        question:
                            "How do you handle negative feedback?",
                        topic: "Feedback",
                        keywords: [
                            "feedback",
                            "listen",
                            "improve",
                            "learning",
                            "positive"
                        ]
                    },

                    {
                        question:
                            "How do you communicate when working under pressure?",
                        topic: "Communication Under Pressure",
                        keywords: [
                            "communication",
                            "calm",
                            "clear",
                            "team",
                            "pressure"
                        ]
                    }

                ],

                Hard: [

                    {
                        question:
                            "Describe a situation where communication solved a problem.",
                        topic: "Problem Communication",
                        keywords: [
                            "communication",
                            "problem",
                            "solution",
                            "team",
                            "result"
                        ]
                    },

                    {
                        question:
                            "How would you communicate a mistake to your manager?",
                        topic: "Professional Communication",
                        keywords: [
                            "communication",
                            "mistake",
                            "honest",
                            "solution",
                            "manager"
                        ]
                    },

                    {
                        question:
                            "How do you handle communication with a difficult person?",
                        topic: "Difficult Communication",
                        keywords: [
                            "communication",
                            "listen",
                            "respect",
                            "calm",
                            "solution"
                        ]
                    }

                ]

            },


            Leadership: {

                Easy: [

                    {
                        question:
                            "What is leadership?",
                        topic: "Leadership Basics",
                        keywords: [
                            "leadership",
                            "team",
                            "guide",
                            "goal",
                            "responsibility"
                        ]
                    },

                    {
                        question:
                            "Have you ever led a team?",
                        topic: "Leadership Experience",
                        keywords: [
                            "team",
                            "lead",
                            "project",
                            "responsibility",
                            "result"
                        ]
                    },

                    {
                        question:
                            "What qualities make a good leader?",
                        topic: "Leadership Qualities",
                        keywords: [
                            "leadership",
                            "communication",
                            "team",
                            "decision",
                            "responsibility"
                        ]
                    }

                ],

                Medium: [

                    {
                        question:
                            "How do you motivate a team?",
                        topic: "Team Motivation",
                        keywords: [
                            "motivate",
                            "team",
                            "goal",
                            "communication",
                            "support"
                        ]
                    },

                    {
                        question:
                            "How do you make decisions as a leader?",
                        topic: "Decision Making",
                        keywords: [
                            "decision",
                            "leader",
                            "information",
                            "team",
                            "solution"
                        ]
                    },

                    {
                        question:
                            "Tell me about a time you took responsibility.",
                        topic: "Leadership Responsibility",
                        keywords: [
                            "responsibility",
                            "team",
                            "problem",
                            "solution",
                            "result"
                        ]
                    }

                ],

                Hard: [

                    {
                        question:
                            "How would you lead a team through a difficult project?",
                        topic: "Leadership",
                        keywords: [
                            "lead",
                            "team",
                            "communication",
                            "planning",
                            "solution"
                        ]
                    },

                    {
                        question:
                            "How would you handle a team member who disagrees with your decision?",
                        topic: "Leadership Conflict",
                        keywords: [
                            "communication",
                            "listen",
                            "team",
                            "decision",
                            "respect"
                        ]
                    },

                    {
                        question:
                            "Describe a situation where you demonstrated leadership.",
                        topic: "Leadership Experience",
                        keywords: [
                            "leadership",
                            "team",
                            "responsibility",
                            "problem",
                            "result"
                        ]
                    }

                ]

            },


            "Problem Solving": {

                Easy: [

                    {
                        question:
                            "How do you approach a problem?",
                        topic: "Problem Solving",
                        keywords: [
                            "problem",
                            "analyze",
                            "solution",
                            "steps",
                            "result"
                        ]
                    },

                    {
                        question:
                            "What do you do when you don't know the answer?",
                        topic: "Problem Solving",
                        keywords: [
                            "learn",
                            "research",
                            "ask",
                            "understand",
                            "solution"
                        ]
                    },

                    {
                        question:
                            "What is your approach to learning something new?",
                        topic: "Learning",
                        keywords: [
                            "learning",
                            "practice",
                            "research",
                            "understand",
                            "improve"
                        ]
                    }

                ],

                Medium: [

                    {
                        question:
                            "Tell me about a challenge you faced and how you solved it.",
                        topic: "Problem Solving",
                        keywords: [
                            "challenge",
                            "problem",
                            "solution",
                            "team",
                            "result",
                            "learning"
                        ]
                    },

                    {
                        question:
                            "How do you handle an unexpected problem?",
                        topic: "Problem Solving",
                        keywords: [
                            "problem",
                            "analyze",
                            "solution",
                            "calm",
                            "result"
                        ]
                    },

                    {
                        question:
                            "Describe a difficult decision you made.",
                        topic: "Decision Making",
                        keywords: [
                            "decision",
                            "problem",
                            "analyze",
                            "solution",
                            "result"
                        ]
                    }

                ],

                Hard: [

                    {
                        question:
                            "Tell me about a failure and what you learned from it.",
                        topic: "Growth Mindset",
                        keywords: [
                            "failure",
                            "mistake",
                            "learning",
                            "improve",
                            "experience",
                            "lesson"
                        ]
                    },

                    {
                        question:
                            "Describe a complex problem you solved.",
                        topic: "Problem Solving",
                        keywords: [
                            "problem",
                            "analyze",
                            "solution",
                            "challenge",
                            "result"
                        ]
                    },

                    {
                        question:
                            "How do you solve a problem when you have limited information?",
                        topic: "Problem Solving",
                        keywords: [
                            "information",
                            "analyze",
                            "research",
                            "assumption",
                            "solution"
                        ]
                    }

                ]

            }

        }

    };


    // =====================================================
    // GET QUESTION LIST
    // =====================================================

    const questionList =
        questions[interviewType]?.[subject]?.[difficulty] ||
        [];


    // =====================================================
    // STATE
    // =====================================================

    const [currentQuestion, setCurrentQuestion] =
        useState(0);

    const [answer, setAnswer] =
        useState("");

    const [answers, setAnswers] =
        useState([]);


    // =====================================================
    // ANSWER EVALUATION
    // =====================================================

    const evaluateAnswer = (userAnswer, expectedKeywords) => {

        const normalizedAnswer =
            userAnswer
                .toLowerCase()
                .replace(/\s+/g, " ")
                .trim();

        let matchedKeywords = 0;


        const synonymGroups = {

            array: [
                "array",
                "arr",
                "int[]",
                "string[]",
                "[]"
            ],

            largest: [
                "largest",
                "maximum",
                "max"
            ],

            maximum: [
                "maximum",
                "largest",
                "max"
            ],

            smallest: [
                "smallest",
                "minimum",
                "min"
            ],

            loop: [
                "loop",
                "for",
                "while",
                "do while"
            ],

            compare: [
                "compare",
                "comparison",
                ">",
                "<",
                ">=",
                "<="
            ],

            string: [
                "string",
                "stringbuilder",
                "stringbuffer"
            ],

            reverse: [
                "reverse",
                "reversed",
                "stringbuilder.reverse",
                "stringbuilder"
            ],

            character: [
                "character",
                "char",
                "charat"
            ],

            char: [
                "char",
                "character",
                "charat"
            ],

            prime: [
                "prime",
                "isprime"
            ],

            number: [
                "number",
                "int",
                "integer"
            ],

            divisible: [
                "divisible",
                "%",
                "remainder",
                "mod"
            ],

            remainder: [
                "remainder",
                "%",
                "mod"
            ],

            mod: [
                "mod",
                "%",
                "remainder"
            ],

            second: [
                "second",
                "secondlargest",
                "second largest"
            ],

            hashmap: [
                "hashmap",
                "hash map",
                "map",
                "hash"
            ],

            pair: [
                "pair",
                "two elements",
                "two numbers"
            ],

            sum: [
                "sum",
                "+",
                "addition"
            ],

            target: [
                "target",
                "targetsum"
            ],

            twosum: [
                "twosum",
                "two sum",
                "two-sum"
            ],

            frequency: [
                "frequency",
                "count",
                "occurrence",
                "occurrences"
            ],

            count: [
                "count",
                "frequency",
                "occurrence",
                "occurrences"
            ],

            set: [
                "set",
                "hashset"
            ],

            unique: [
                "unique",
                "distinct",
                "non repeating",
                "non-repeating"
            ],

            substring: [
                "substring",
                "sub string"
            ],

            "o(n)": [
                "o(n)",
                "linear time",
                "linear",
                "on"
            ]

        };


        expectedKeywords.forEach((keyword) => {

            const key =
                keyword.toLowerCase();

            if (normalizedAnswer.includes(key)) {

                matchedKeywords++;

                return;
            }


            const alternatives =
                synonymGroups[key] || [];


            const matched =
                alternatives.some((alternative) =>
                    normalizedAnswer.includes(
                        alternative.toLowerCase()
                    )
                );


            if (matched) {

                matchedKeywords++;

            }

        });


        const percentage =
            expectedKeywords.length === 0
                ? 0
                : (matchedKeywords /
                    expectedKeywords.length) * 100;


        if (percentage >= 60) {

            return {
                score: 2,
                result: "Correct"
            };

        }


        if (percentage >= 30) {

            return {
                score: 1,
                result: "Partially Correct"
            };

        }


        return {
            score: 0,
            result: "Incorrect"
        };

    };


    // =====================================================
    // SUBMIT ANSWER
    // =====================================================

    const handleSubmit = () => {

        if (!answer.trim()) {

            alert(
                "Please enter your answer before submitting."
            );

            return;
        }


        const currentQuestionData =
            questionList[currentQuestion];


        const evaluation =
            evaluateAnswer(
                answer,
                currentQuestionData.keywords
            );


        const answerData = {

            question:
                currentQuestionData.question,

            subject:
                subject,

            topic:
                currentQuestionData.topic,

            answer:
                answer,

            score:
                evaluation.score,

            result:
                evaluation.result

        };


        const updatedAnswers = [
            ...answers,
            answerData
        ];


        setAnswers(updatedAnswers);


        // =================================================
        // LAST QUESTION
        // =================================================

        if (
            currentQuestion ===
            questionList.length - 1
        ) {

            navigate(
                "/interview-result",
                {
                    state: {

                        interviewType,

                        subject,

                        difficulty,

                        questions:
                            questionList,

                        answers:
                            updatedAnswers,

                        // Unique ID for this interview attempt
                        attemptId:
                            attemptIdRef.current,

                        attemptId:
                            attemptIdRef.current

                    }

                }
            );

            return;
        }


        // =================================================
        // NEXT QUESTION
        // =================================================

        setCurrentQuestion(
            currentQuestion + 1
        );

        setAnswer("");

    };


    // =====================================================
    // EXIT
    // =====================================================

    const handleExit = () => {

        navigate(
            "/practice-interview"
        );

    };


    // =====================================================
    // NO QUESTIONS FOUND
    // =====================================================

    if (questionList.length === 0) {

        return (

            <div className="question-page">

                <div className="question-container">

                    <div className="question-card">

                        <h1>
                            Questions Not Available
                        </h1>

                        <p>
                            Questions for{" "}
                            <strong>
                                {subject}
                            </strong>{" "}
                            at{" "}
                            <strong>
                                {difficulty}
                            </strong>{" "}
                            level are not available yet.
                        </p>

                        <button
                            className="submit-btn"
                            onClick={handleExit}
                        >
                            ← Back to Practice
                        </button>

                    </div>

                </div>

            </div>

        );

    }


    // =====================================================
    // UI
    // =====================================================

    return (

        <div className="question-page">

            {/* HEADER */}

            <div className="question-header">

                <button
                    className="back-btn"
                    onClick={handleExit}
                >
                    ← Back
                </button>


                <div className="question-info">

                    <span>
                        {interviewType} Interview
                    </span>

                    <span>
                        {subject}
                    </span>

                    <span>
                        {difficulty}
                    </span>

                </div>

            </div>


            {/* QUESTION */}

            <div className="question-container">

                <div className="question-card">

                    <div className="question-number">

                        Question{" "}

                        {currentQuestion + 1}

                        {" "}of{" "}

                        {questionList.length}

                    </div>


                    <h1>
                        {questionList[currentQuestion].question}
                    </h1>


                    {/* ANSWER */}

                    <div className="answer-section">

                        <label>
                            Your Answer
                        </label>


                        <textarea
                            value={answer}
                            onChange={(e) =>
                                setAnswer(
                                    e.target.value
                                )
                            }
                            placeholder="Type your answer here..."
                            rows="8"
                        />

                    </div>


                    {/* BUTTONS */}

                    <div className="question-actions">

                        <button
                            className="exit-btn"
                            onClick={handleExit}
                        >
                            Exit Interview
                        </button>


                        <button
                            className="submit-btn"
                            onClick={handleSubmit}
                        >

                            {currentQuestion ===
                                questionList.length - 1

                                ? "Finish Interview →"

                                : "Submit Answer →"}

                        </button>

                    </div>

                </div>

            </div>

        </div>

    );

}

export default InterviewQuestion;