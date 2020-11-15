import React from 'react'

const Social = ({artist}) => {
    return (
        <div>
            {/* <pre> {JSON.stringify(artist,null,4)}</pre> */}
            <div className="flex flex-row p-4 ">
            <a href={`http://${artist.strWebsite}`} target="_blank" rel="noreferrer">
            <div className="flex flex-row items-center px-5 text-green-500 p-2 border border-green-500 bg-transparent rounded-xl hover:bg-green-500 hover:text-gray-200 cursor-pointer mr-6 ">
            <svg className="w-8 h-8 " fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM4.332 8.027a6.012 6.012 0 011.912-2.706C6.512 5.73 6.974 6 7.5 6A1.5 1.5 0 019 7.5V8a2 2 0 004 0 2 2 0 011.523-1.943A5.977 5.977 0 0116 10c0 .34-.028.675-.083 1H15a2 2 0 00-2 2v2.197A5.973 5.973 0 0110 16v-2a2 2 0 00-2-2 2 2 0 01-2-2 2 2 0 00-1.668-1.973z" clipRule="evenodd" /></svg>
            <div> Website </div>
            </div>
            </a>
            <a href={`http://${artist.strFacebook}`} target="_blank" rel="noreferrer">
            <div className="flex flex-row items-center px-5 text-blue-700 p-2 border border-blue-700 bg-transparent rounded-xl hover:bg-blue-700 hover:text-gray-200 cursor-pointer mr-6">
            <svg xmlns="http://www.w3.org/2000/svg"  fill="currentColor" className="w-8 h-8 " viewBox="0 0 24 24"><path d="M22.675 0h-21.35c-.732 0-1.325.593-1.325 1.325v21.351c0 .731.593 1.324 1.325 1.324h11.495v-9.294h-3.128v-3.622h3.128v-2.671c0-3.1 1.893-4.788 4.659-4.788 1.325 0 2.463.099 2.795.143v3.24l-1.918.001c-1.504 0-1.795.715-1.795 1.763v2.313h3.587l-.467 3.622h-3.12v9.293h6.116c.73 0 1.323-.593 1.323-1.325v-21.35c0-.732-.593-1.325-1.325-1.325z"/></svg>
            <div className="ml-4"> Facebook </div>
            </div>
            </a>
            <a href={`${artist.strTwitter ? `http://${artist.strTwitter}` : '#' }`} target={`${artist.strTwitter && "_blank"}`} rel="noreferrer">
            <div className="flex flex-row items-center px-5 text-blue-300 p-2 border border-blue-300 bg-transparent rounded-xl hover:bg-blue-300 hover:text-gray-200 cursor-pointer">
            <svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" className="w-8 h-8 " viewBox="0 0 24 24"><path d="M24 4.557c-.883.392-1.832.656-2.828.775 1.017-.609 1.798-1.574 2.165-2.724-.951.564-2.005.974-3.127 1.195-.897-.957-2.178-1.555-3.594-1.555-3.179 0-5.515 2.966-4.797 6.045-4.091-.205-7.719-2.165-10.148-5.144-1.29 2.213-.669 5.108 1.523 6.574-.806-.026-1.566-.247-2.229-.616-.054 2.281 1.581 4.415 3.949 4.89-.693.188-1.452.232-2.224.084.626 1.956 2.444 3.379 4.6 3.419-2.07 1.623-4.678 2.348-7.29 2.04 2.179 1.397 4.768 2.212 7.548 2.212 9.142 0 14.307-7.721 13.995-14.646.962-.695 1.797-1.562 2.457-2.549z"/></svg>
            <div> Twitter </div>
            </div>
            </a>
            </div>
        </div>
    )
}

export default Social

