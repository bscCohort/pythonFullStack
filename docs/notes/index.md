# Full Stack, End to End

You already know most of this.

Over the last few semesters you have studied networks, operating systems, database
management, data structures and web technologies. You can define DNS. You can write a
`SELECT` with a `JOIN`. You know what a process is.

What you have probably never done is **watch all of it work at once, in one running
program that you can break and fix.**

That is what this site is for.

---

## What we are building

One project, already written, running on real infrastructure:

<div class="layers">
  <div class="layer">
    <code>React + Vite</code>
    <span>runs in your browser, draws the screen</span>
  </div>
  <div class="layer">
    <code>FastAPI (Python)</code>
    <span>answers requests, decides what is allowed</span>
  </div>
  <div class="layer">
    <code>PostgreSQL (Neon)</code>
    <span>stores the data, on a server in another country</span>
  </div>
</div>

A student management system: students, courses, and the enrollments that link them.
Small enough to read in an afternoon. Real enough that everything you know applies.

---

## Why this site is not a linear course

Most courses go A, B, C, D. Real software is not shaped like that. Every part touches every
other part, so there is no order in which nothing is a forward reference.

**Concepts** is one page per idea. Never read it front to back. Look things up when you
hit them, in class or in the code.

**The Codebase** section walks the project folder by folder, so you can start reading at
any point rather than having to begin at the beginning.

!!! tip "You are not expected to build this from scratch"
    The project is finished on day one. You will **read** it, **run** it, **break** it,
    and finally **extend** it by adding a whole new feature yourself.

    Reading working code and understanding why it is shaped that way is a bigger part of
    real engineering than typing new code. That is deliberate.

---

## The question this course exists to answer

By the end you should be able to answer this without hesitating:

> **What actually happens when you type a URL and press Enter?**

You already know every piece of that answer. Right now they are stored in separate
boxes labelled "Networks", "DBMS" and "Web Technologies". The job of this site
is to knock the walls down.

Here is the shape of it, using the project you will be working in:

<div class="flow">
  <div class="flow-box"><strong>Browser</strong><small>localhost:5173</small></div>
  <div class="flow-wire"></div>
  <div class="flow-box"><strong>React</strong><small>fetch("/api/students")</small></div>
  <div class="flow-wire"></div>
  <div class="flow-box"><strong>FastAPI</strong><small>:8000</small></div>
  <div class="flow-wire"></div>
  <div class="flow-box"><strong>Postgres</strong><small>us-east-1</small></div>
</div>

Four boxes. Every one of them is something you have studied. We are going to follow that
dot all the way across and all the way back, and by the end you will know what happens at
each hop, what can go wrong there, and how to tell.

---

## Start

[Read this first: how to use this site](how-to-use.md){ .md-button .md-button--primary }
[Browse the concepts](concepts/api/what-is-an-api.md){ .md-button }
