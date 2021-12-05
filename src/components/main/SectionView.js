import ContentLoader from 'react-content-loader';
import ItemsPhone from '../items-phone/Items-phone';
import { useSelector } from 'react-redux';
import { useState, useEffect } from 'react';

const SectionView = () => {
  let { itemsFilter, valueSearch } = useSelector((state) => state.reducer);
  const [download, setDownload] = useState(false);
  itemsFilter = itemsFilter.filter((item) => {
    return item.name.toLowerCase().includes(valueSearch.toLowerCase());
  });
  useEffect(() => {
    setTimeout(() => {
      setDownload(true);
    }, 500);
  }, []);

  return (
    <section className="main_section_phone">
      {download
        ? itemsFilter.map((item) => {
            return <ItemsPhone key={item.id} item={item} />;
          })
        : itemsFilter.map((item) => {
            return (
              <ContentLoader
                className="content_loader"
                key={item.id}
                speed={1}
                // width={332}
                // height={550}
                viewBox="0 0 332 550"
                backgroundColor="#f3f3f3"
                foregroundColor="#ebebeb">
                <rect x="38" y="17" rx="5" ry="5" width="265" height="279" />
                <rect x="97" y="95" rx="0" ry="0" width="0" height="1" />
                <rect x="96" y="96" rx="0" ry="0" width="1" height="0" />
                <rect x="100" y="283" rx="0" ry="0" width="10" height="2" />
                <rect x="89" y="281" rx="0" ry="0" width="21" height="1" />
                <rect x="167" y="237" rx="0" ry="0" width="0" height="1" />
                <rect x="289" y="130" rx="0" ry="0" width="0" height="1" />
                <rect x="265" y="257" rx="0" ry="0" width="2" height="0" />
                <rect x="446" y="93" rx="0" ry="0" width="134" height="138" />
                <rect x="60" y="319" rx="0" ry="0" width="124" height="26" />
                <rect x="255" y="318" rx="0" ry="0" width="36" height="27" />
                <rect x="63" y="377" rx="0" ry="0" width="202" height="16" />
                <rect x="63" y="405" rx="0" ry="0" width="162" height="16" />
                <rect x="166" y="464" rx="0" ry="0" width="69" height="35" />
                <rect x="92" y="464" rx="0" ry="0" width="69" height="35" />
              </ContentLoader>
            );
          })}
      <button className="btn_more">Load more</button>
    </section>
  );
};

export default SectionView;
