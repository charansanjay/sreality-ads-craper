import React from 'react';
import { render, waitFor, screen } from '@testing-library/react';
//import { setDefaultOptions } from '@testing-library/react';
import axios from 'axios';
import MockAdapter from 'axios-mock-adapter';
import AdsList from './pages/adsList/AdsList';

// Create a mock instance for Axios
const mockAxios = new MockAdapter(axios);

/* The test environment does not support importing non-JavaScript files, such as style files like App.scss. 
Hence we need mock the import statement for the style file in your test file. */
jest.mock('./App.scss', () => {});
jest.mock('./pages/adsList/adsList.scss', () => {});
jest.mock('./components/pagination/pagination.scss', () => {});
jest.mock('./components/modal/modal.scss', () => {});

// Mock the API response
const mockResponse = {
  _embedded: {
    estates: [
      {
        name: 'Prodej bytu 3+1 64 m²',
        _links: {
          dynamicDown: [
            {
              href: 'https://d18-a.sdn.cz/d_18/c_img_QO_K1/T7yBMTz.jpeg?fl=res,{width},{height},3|shr,,20|jpg,90',
            },
          ],
          dynamicUp: [
            {
              href: 'https://d18-a.sdn.cz/d_18/c_img_QO_K1/T7yBMTz.jpeg?fl=res,{width},{height},3|wrm,/watermark/sreality.png,10|shr,,20|jpg,90',
            },
          ],
          iterator: {
            href: '/cs/v2/estate-iterator/0?category_main_cb=1&suggested_regionId=-1&suggested_districtId=-1&category_type_cb=1',
          },
          self: {
            href: '/cs/v2/estates/2008175692',
          },
          images: [
            {
              href: 'https://d18-a.sdn.cz/d_18/c_img_QO_K1/T7yBMTz.jpeg?fl=res,400,300,3|shr,,20|jpg,90',
            },
            {
              href: 'https://d18-a.sdn.cz/d_18/c_img_QO_K1/qG0BMT0.jpeg?fl=res,400,300,3|shr,,20|jpg,90',
            },
            {
              href: 'https://d18-a.sdn.cz/d_18/c_img_QO_K1/K8CBMT1.jpeg?fl=res,400,300,3|shr,,20|jpg,90',
            },
            {
              href: 'https://d18-a.sdn.cz/d_18/c_img_QK_Jn/7JWBgZs.jpeg?fl=res,400,300,3|shr,,20|jpg,90',
            },
            {
              href: 'https://d18-a.sdn.cz/d_18/c_img_QM_Kc/ZPTkq4.jpeg?fl=res,400,300,3|shr,,20|jpg,90',
            },
            {
              href: 'https://d18-a.sdn.cz/d_18/c_img_QM_Kc/ynykq5.jpeg?fl=res,400,300,3|shr,,20|jpg,90',
            },
          ],
          image_middle2: [
            {
              href: 'https://d18-a.sdn.cz/d_18/c_img_QO_K1/T7yBMTz.jpeg?fl=res,400,300,3|shr,,20|jpg,90',
            },
          ],
        },
      },
    ],
  },
};

// Set the test environment to jsdom. By setting the test environment to "jsdom", the document object will be available during the test execution
//setDefaultOptions({ testEnvironment: 'jsdom' });

// Mock the Axios GET request to return the mock response
mockAxios
  .onGet(
    'https://www.sreality.cz/api/cs/v2/estates?category_main_cb=1&category_type_cb=1&per_page=500'
  )
  .reply(200, mockResponse);

describe('AdsList', () => {
  it('renders the items correctly', async () => {
    const items = [
      {
        title: 'Prodej bytu 3+1 64 m²',
        imageUrl: [
          {
            href: 'https://d18-a.sdn.cz/d_18/c_img_QO_K1/T7yBMTz.jpeg?fl=res,400,300,3|shr,,20|jpg,90',
          },
        ],
      },
    ];
    render(<AdsList items={items} />);

    // Wait for the items to be rendered
    await waitFor(() => screen.getByTestId('ads-list'));

    // Assert that the items are displayed correctly
    expect(screen.getByText('Prodej bytu 3+1 64 m²')).toBeInTheDocument();
    expect(screen.getByAltText('Prodej bytu 3+1 64 m²')).toHaveAttribute(
      'src',
      'https://d18-a.sdn.cz/d_18/c_img_QO_K1/T7yBMTz.jpeg?fl=res,400,300,3|shr,,20|jpg,90'
    );
  });
});
