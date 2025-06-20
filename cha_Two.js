class SearchSuggestionSystem {
    constructor(products) {
      // Sort products alphabetically when initializing
      this.products = products.sort();
    }
  
    getSuggestions(searchWord) {
      const suggestions = []; // This will store our final result
      let prefix = ''; // This will build our search prefix character by character
      let lastMatchIndex = 0; // Helps optimize by remembering where we found matches last time
  
      // Loop through each character in the search word
      for (const char of searchWord) {
        prefix += char; // Add the current character to our prefix
        const currentSuggestions = []; // Stores matches for this prefix
        let count = 0; // Tracks how many matches we've found
  
        // Start searching from where we left off last time
        for (let i = lastMatchIndex; i < this.products.length; i++) {
          const product = this.products[i];
          
          // Check if product starts with current prefix
          if (product.startsWith(prefix)) {
            // If this is our first match, update where we'll start next time
            if (currentSuggestions.length === 0) {
              lastMatchIndex = i;
            }
            
            // Add the product to our suggestions
            currentSuggestions.push(product);
            count++;
            
            // Stop if we've found 3 matches
            if (count === 3) break;
          } 
          // Since products are sorted, we can stop if we've passed possible matches
          else if (product > prefix) {
            break;
          }
        }
        
        // Add this prefix's matches to our final result
        suggestions.push(currentSuggestions);
      }
      
      return suggestions;
    }
  }
  
  // Example usage:
  const products = ["mobile", "mouse", "moneypot", "monitor", "mousepad"];
  const searchSystem = new SearchSuggestionSystem(products);
  const result = searchSystem.getSuggestions("mouse");
  
  console.log("Search suggestions for 'mouse':");
  console.log(result);