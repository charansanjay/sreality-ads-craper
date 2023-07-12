// Dependencies Import
import React from 'react';

// CSS Import
import './adsList.scss';

type ImageUrl = {
  href: string;
};

type Item = {
  title: string;
  imageUrl: ImageUrl[];
};

type AdsListProps = {
  items: Item[];
};

const AdsList: React.FC<AdsListProps> = ({ items }) => {
  console.log('items: ' + JSON.stringify(items));
  return (
    <div className='ads-list-container'>
      <div className='ads-list'>
        {items.map((item, index) => (
          <div key={index} className='card'>
            <div className='image-container'>
              {item.imageUrl.map((image, imageIndex) => (
                <>
                  {imageIndex < 4 ? (
                    <img key={imageIndex} src={image.href} alt={item.title} />
                  ) : (
                    <></>
                  )}
                </>
              ))}
            </div>

            <h3>{item.title}</h3>
            <hr></hr>
          </div>
        ))}
      </div>
    </div>
  );
};


export default AdsList;
