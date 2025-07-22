import React from 'react'
import {Helmet} from "react-helmet";
import  { Toaster } from 'react-hot-toast';

const Layout = ({children,title,description,author,keywords }) => {
  return (
    <>
       <Helmet>
            <meta charSet="utf-8" />
            <meta name="description" content={description} />
            <meta name="keywords" content={keywords} />
            <meta name="author" content={author} />
            <title>{title}</title>   
        </Helmet>
        <Toaster />
        {children}
    </>
  )
};
Layout.defaultProps={
    title :"Toefit",
    description:"shoe store",
    keywords: "shoes,ladies,mens,sale",
    author: "Abubakar shafeeq, Husnain Salamat"
}

export default Layout
