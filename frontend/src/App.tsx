// Dependencies Import
import React, { useEffect, useState } from 'react';
import axios from 'axios';

// CSS Import
import './App.scss';

// Components Import
import Modal from './components/modal/Modal';
import AdsList from './pages/adsList/AdsList';
import Pagination from './components/pagination/Pagination';
import { ads } from './data/ads';

// Service Import
import { API } from './config/backend';

type ImageUrl = {
  href: string;
};

type Item = {
  id: string;
  title: string;
  imageUrl: ImageUrl[];
};

const App: React.FC = () => {
  // Internal states
  const [items, setItems] = useState<Item[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(25);
  const [error, setError] = useState('');

  useEffect(() => {
    var isMounted = true; // Track the mounted state of the component
    const fetchData = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/api/sreality`);

        console.log('status' + response.status);

        const scrapedItems = response.data._embedded.estates.map(
          (item: any) => ({
            id: item.hash_id,
            title: item.name,
            imageUrl: item._links.images,
          })
        );

        setItems(scrapedItems);
      } catch (error) {
        /* const scrapedItems = ads.map((item: any) => ({
          id: item.hash_id,
          title: item.name,
          imageUrl: item._links.images,
        }));
        setItems(scrapedItems); */
        setError('Erroor fetching data. Please try again later.');
      }
    };

    fetchData();

    return () => {
      isMounted = false; // Set the mounted state to false on cleanup
    };
  }, []);

  // Pagination
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = items.slice(indexOfFirstItem, indexOfLastItem);

  // Change page
  const paginate = (pageNumber: number) => {
    window.scrollTo({ top: 0, left: 0, behavior: "smooth" });
    setCurrentPage(pageNumber);
    
  } 

  return (
    <div className='app-container'>
      {/* heading */}
      <h1>Scraped Items</h1>

      {/* Pagination section */}
      <Pagination
        itemsPerPage={itemsPerPage}
        totalItems={items.length}
        currentPage={currentPage}
        paginate={paginate}
      />
      {/* Display Ads */}
      <div className='items-per-page'>
        <p>estates per page <span>{itemsPerPage}</span> </p>
      </div>
      {error ? <Modal message={error} /> : <AdsList items={currentItems} />}
      <Pagination
        itemsPerPage={itemsPerPage}
        totalItems={items.length}
        currentPage={currentPage}
        paginate={paginate}
      />
    </div>
  );
};

export default App;
