import React from 'react';
import PropTypes from 'prop-types';
import Link from 'next/link';
import ArrowButton from '../shared/ArrowButton';
import { Card } from './styled';
import MainCategory from '../shared/styled/MainCategory';

const Identity = ({}, { t }) => (
  <section className="identity">
    <div className="container">
      <MainCategory>
        {t('Айдентика')}
      </MainCategory>
      <div className="columns">
        <div className="column is-12-mobile is-6-tablet is-4-desktop">
          <Link href="">
            <Card>
              <div className="img-wrap">
                <img
                  className="photo"
                  src="/static/brandbook.png"
                  alt="brandbook"
                />
                <ArrowButton color="ffffff" />
              </div>
              <h1>
                {t('Брендбук РКЦ')}
              </h1>
            </Card>
          </Link>
        </div>
        <div className="column is-12-mobile is-6-tablet is-4-desktop">
          <Link href="/logo">
            <Card>
              <div className="img-wrap">
                <img
                  className="photo"
                  src="/static/logotypes.png"
                  alt="logotypes"
                />
                <ArrowButton color="ffffff" />
              </div>
              <h1>
                {t('Логотипы РКЦ')}
              </h1>
            </Card>
          </Link>
        </div>
      </div>
    </div>
  </section>
);

Identity.contextTypes = {
  t: PropTypes.func,
};

export default Identity;
