import { LightningElement } from 'lwc';

export default class SearchDataTableUtility extends LightningElement {
    searchText = '';
    selectedCategory = 'all';
    sortBy = 'Name_ASC';

    columns = [
        { label: 'Name', fieldName: 'name' },
        { label: 'Category', fieldName: 'category' },
        { label: 'Score', fieldName: 'score', type: 'number' }
    ];

    items = [
        { id: 1, name: 'LWC Masterclass', category: 'Learning', score: 85 },
        { id: 2, name: 'Everything AI', category: 'Learning', score: 90 },
        { id: 3, name: 'Workouts', category: 'Health', score: 75 },
        { id: 4, name: 'Diet Plan', category: 'Health', score: 88 },
        { id: 5, name: 'Promotion', category: 'Career', score: 92 }
    ];

    get categoryOptions() {
        return [
            { label: 'All', value: 'all' },
            { label: 'Learning', value: 'Learning' },
            { label: 'Health', value: 'Health' },
            { label: 'Career', value: 'Career' }
        ];
    }

    get sortOptions() {
        return [
            { label: 'Name [A-Z]', value: 'Name_ASC' },
            { label: 'Name [Z-A]', value: 'Name_DESC' }
        ];
    }

    handleSearch(event) {
        this.searchText = event.target.value;
    }

    handleCategory(event) {
        this.selectedCategory = event.target.value;
    }

    handleSort(event) { 
        this.sortBy = event.target.value;
    }

    get filteredItems() {
        let result = this.items.filter(item => {
            let searchResult = item.name.toLowerCase().includes(this.searchText.toLowerCase());
            let searchResultByCategory = this.selectedCategory === 'all' || item.category === this.selectedCategory;
            return searchResult && searchResultByCategory;
        });

        if(this.sortBy === 'Name_ASC') {
            result.sort((a, b) => a.name.localeCompare(b.name));
        } else if(this.sortBy === 'Name_DESC') {
            result.sort((a, b) => b.name.localeCompare(a.name));
        }

        return result;
    }
}