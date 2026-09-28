fetch('http://localhost:3000/blogs')
  .then(res => res.text())
  .then(text => {
    const matches = text.match(/<img[^>]+src="([^">]+)"/g);
    console.log(matches);
  });
