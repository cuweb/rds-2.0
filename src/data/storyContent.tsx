const paragraphs = [
  'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aliquam augue turpis, feugiat vitae viverra in, egestas vitae nulla. Quisque auctor ultrices mauris, et semper urna aliquam quis. Duis sed malesuada metus, et tristique dolor. Suspendisse vestibulum hendrerit.',
  'Aliquam blandit tellus odio, nec commodo est efficitur sit amet. Proin molestie, risus in mollis laoreet, lectus dui egestas augue, eu maximus velit dui sed quam. Pellentesque iaculis suscipit libero gravida tempus. Phasellus in egestas sapien ac libero.',
  'Aenean sit amet tortor pellentesque, posuere tellus vitae, sagittis justo. Vivamus imperdiet turpis nec elit ultricies, sed tempus diam dignissim. Suspendisse condimentum magna vel orci vulputate, eget vulputate neque porttitor.',
  'Nobis voluptatem dolorum et eum doloremque cupiditate velit. Praesentium architecto a distinctio aut reprehenderit ducimus. Perferendis excepturi delectus nihil voluptatem non. Molestiae quas dolores accusamus in. Praesent quis ligula quis nulla malesuada tempor.',
];

export const SingleParagraph = ({ index = 0 }: { index?: number }) => (
  <p>{paragraphs[index % paragraphs.length]}</p>
);

export const MultiParagraph = ({ count = 2 }: { count?: number }) => (
  <>
    {Array.from({ length: count }).map((_, i) => (
      <SingleParagraph key={i} index={i} />
    ))}
  </>
);

export const SampleList = () => (
  <ul>
    <li>Item One</li>
    <li>Item Two</li>
    <li>Item Three</li>
  </ul>
);
