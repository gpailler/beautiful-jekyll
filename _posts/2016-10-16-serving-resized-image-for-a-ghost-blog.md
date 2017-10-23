---
layout: post
published: true
title: Serving resized images for a Ghost blog
tags:
  - web
---

[Ghost blog](https://ghost.org/) is a nice blog engine, lightweight and fast focused on content. When you don't need the power of Wordpress, it's a good alternative.

{: .box-warning}
**Warning:** This article was published long time ago. It's probably outdated.

But one of the missing feature of Ghost ([for now](https://github.com/TryGhost/Ghost/issues/4453)) is the ability to serve resized images (you upload an image once and you serve different sizes for different situations).

I searched on the big Internet and found a small script called [ghost-image-resize](https://github.com/melistik/ghost-image-resize) on GitHub. I forked the project to add Nginx configuration example and to use latest SimpleImage library.

**<i class="fa fa-lg fa-github"></i> project:** [https://github.com/gpailler/ghost-image-resize](https://github.com/gpailler/ghost-image-resize)

The goal of the script is to resize images on the fly through a PHP script. We configure Nginx to intercept images GET queries and pass these queries to the PHP script. Then we can add arguments to the image URL to customize size and quality. If no argument is provided, the original image is served. When an image is resized by the script, the image is saved in a cache folder and is served directly on next call.

#### Script configuration
* Clone the repo with `$ git clone --recursive https://github.com/gpailler/ghost-image-resize`
* Edit the file `im-cache.php` to configure `$image_root` with the root path of the Ghost blog. By default a folder named `cache` is created in the repo folder. This folder must be writeable by PHP (usually www-data user).

#### Nginx Configuration
Add a location block to intercept images queries
```
location ~ /content/images/(.+)\.(png|jpg|jpeg|gif)$ {
  # If no argument is provided, Nginx will serve original image
  if ($args = '') {
    rewrite ^/content/(.*)$ /_content/$1 last;
  }

  fastcgi_pass unix:/run/php/php7.0-fpm.sock;
  fastcgi_param PATH_INFO $1.$2;
  fastcgi_param SCRIPT_FILENAME [absolute path to im-cache]/im-cache.php;
  include fastcgi_params;
}

location /_content {
  internal;
  alias [absolute path to ghost root]/content/;
}
```

#### Usage
To serve a resized image, you just have to append **w** (width) or **h** (height) argument to the image path and the image is resized proportionally. For example:
`![Image alt](/content/images/2016/10/myimage.jpg?w=300)`
