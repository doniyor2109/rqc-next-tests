/* eslint-disable jsx-a11y/anchor-is-valid */
import React from 'react';
import { RichText } from 'prismic-reactjs';
import Link from 'next/link';
import PrismicConfig from '../../prismic-configuration';
import ArrowButton from '../shared/ArrowButton';

const ReportCard = ({ item }) => {
  const back = { background: `url(${item.wallpaper.url})`, backgroundSize: 'cover' };
  return (
    <div className="column is-12-mobile is-6-tablet is-4-desktop">
      <Link href={item.report_url.url}>
        <a target="_blank" rel="noopener noreferrer">
          <div className="report" style={back}>
            {RichText.render(item.heading, PrismicConfig.linkResolver)}
            <ArrowButton
              color="ffffff"
              target_blank
            />
          </div>
        </a>
      </Link>
    </div>
  );
};

export default ReportCard;
