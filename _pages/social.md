---
layout: page
title: Social
permalink: /social/
nav: true
nav_order: 2.5
---

<head>
    <style>
        .lab-title-bar {
            border-top: 1px solid var(--global-divider-color);
            margin-top: 0;
            margin-bottom: 2rem;
        }
        .social-event {
            margin-bottom: 2.75rem;
        }
        .social-event h2 {
            font-size: 1.5em;
            margin-bottom: 0.2rem;
        }
        .social-event .social-date {
            margin-bottom: 0.75rem;
            opacity: 0.7;
        }
        .social-event .social-caption {
            margin-bottom: 0.75rem;
        }
        .social-gallery figure {
            margin: 0;
            max-width: 100%;
        }
        .social-gallery img {
            width: 100%;
            height: auto;
            border-radius: 8px;
        }
    </style>
</head>

<hr class="lab-title-bar">

{% for event in site.data.social %}
  {%- assign prefix = "/assets/img/social/" | append: event.folder | append: "/" -%}
  {%- assign event_images = "" | split: "" -%}
  {%- for file in site.static_files -%}
    {%- assign ext = file.extname | downcase -%}
    {%- if file.path contains prefix -%}
      {%- if ext == ".jpg" or ext == ".jpeg" or ext == ".png" or ext == ".gif" or ext == ".webp" -%}
        {%- assign event_images = event_images | push: file -%}
      {%- endif -%}
    {%- endif -%}
  {%- endfor -%}
  {%- if event_images.size > 0 -%}
    {%- if event_images.size == 1 -%}
      {%- assign col_class = "col-sm-8 col-md-6" -%}
    {%- else -%}
      {%- assign col_class = "col-sm-6 col-md-4" -%}
    {%- endif -%}

    <div class="social-event">
      <h2>{{ event.title }}</h2>
      {%- if event.date -%}
      <p class="social-date">{{ event.date }}</p>
      {%- endif -%}
      {%- if event.caption -%}
      <p class="social-caption">{{ event.caption }}</p>
      {%- endif -%}
      <div class="row social-gallery">
        {%- for file in event_images -%}
          {%- assign img_path = file.path | remove_first: "/" -%}
          <div class="{{ col_class }} mt-3">
            {% include figure.html path=img_path title=event.title alt=event.title class="img-fluid rounded z-depth-1" zoomable=true %}
          </div>
        {%- endfor -%}
      </div>
    </div>
  {%- endif -%}
{% endfor %}
