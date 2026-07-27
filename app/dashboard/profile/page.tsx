//Seller profile - Boiketlo
export default function SellerProfile() {
return (
    <div>
      <div className="md:flex">
        <div className="p-8 w-full">
          <div className="flex items-center space-x-4">
            <img 
              className="h-24 w-24 rounded-full object-cover ring-4 ring-indigo-50" 
              src="https://unsplash.com" 
              alt="User avatar" 
            />
            <div>
              <h1 className="text-xl font-bold text-gray-900">Name Example</h1>
              <p className="text-xs text-gray-500 mt-0.5">City, Country</p>
            </div>
          </div>
          
          <div className="mt-6 border-t border-gray-100 pt-4">
            <h2 className="text-sm font-semibold text-gray-900 uppercase tracking-wider">About Me</h2>
            <p className="mt-2 text-sm text-gray-600 leading-relaxed">
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Alias, officiis, pariatur velit debitis sapiente incidunt eum dolor molestias consectetur corporis cumque ullam voluptatibus deserunt obcaecati, necessitatibus error odit temporibus asperiores!
            </p>
          </div>

          <div className="mt-6 border-t border-gray-100 pt-4">
            <h2 className="text-sm font-semibold text-gray-900 uppercase tracking-wider">My Craft</h2>
            <p className="mt-2 text-sm text-gray-600 leading-relaxed">
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Alias, officiis, pariatur velit debitis sapiente incidunt eum dolor molestias consectetur corporis cumque ullam voluptatibus deserunt obcaecati, necessitatibus error odit temporibus asperiores!
            </p>
          </div>
        </div>
      </div>
    </div>
);
}