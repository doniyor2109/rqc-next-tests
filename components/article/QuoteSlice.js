import React from 'react'
import { RichText } from 'prismic-reactjs';
import PrismicConfig from '../../prismic-configuration';

const QuoteSlice = ({slice}) => (

    <div className="slice-type-quote columns">
            <div className="column is-8-desktop is-offset-2-desktop">
                <div className="quote-body">
                    <img className="open-quote" src="../static/quote-mark-open.svg" alt="quotation mark" />
                    {RichText.render(slice.primary.quote_text, PrismicConfig.linkResolver)}
                    <img className="close-quote" src="../static/quote-mark-close.svg" alt="quotation mark" />
                </div>
                <div className="quote-footer">
                    {RichText.render(slice.primary.quote_author, PrismicConfig.linkResolver)}
                    {RichText.render(slice.primary.quote_author_position, PrismicConfig.linkResolver)}
                </div>
            </div>


    </div>
    )
            
export default QuoteSlice