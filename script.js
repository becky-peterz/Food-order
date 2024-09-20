let username = prompt("What is your name?");
document.getElementById('user').innerHTML = `Welcome ${username}, what can I get for you today?`;

const Menu = [
    {
        category: "Foods",
        items: {
            "Pizza": [
                { name: "BBQ chicken pizza", price: 12.00 },
                { name: "Sausage pizza", price: 10.00 },
                { name: "Supreme chicken pizza", price: 14.00 },
                { name: "Meat madness chicken", price: 15.00 }
            ],
            "Burgers": [
                { name: "Chicken Burger", price: 8.00 },
                { name: "Beef Burger", price: 9.00 },
                { name: "Vegan burger", price: 10.00 },
                { name: "Double beef burger", price: 12.00 }
            ],
            "Sharwama": [
                { name: "Chicken Sharwama", price: 7.00 },
                { name: "Meat Sharwama", price: 8.00 }
            ],
            "Rice": [
                { name: "Fried rice", price: 5.00 },
                { name: "Steamed rice", price: 4.00 }
            ],
        }
    },
    {
        category: "Drinks",
        items: {
            "Smoothie": [
                { name: "Banana and strawberry smoothie", price: 6.00 },
                { name: "Apple smoothie", price: 6.00 }
            ],
            "Cocktails": [
                { name: "Mojito", price: 8.00 },
                { name: "Cosmopolitan", price: 9.00 },
                { name: "Long Island", price: 10.00 },
                { name: "Pina colada", price: 9.00 }
            ]
        }
    },
    {
        category: "Dessert",
        items: {
            "Cake": [
                { name: "Red velvet", price: 4.00 },
                { name: "Vanilla", price: 4.00 }
            ],
            "Pudding": [
                { name: "Vanilla", price: 3.00 },
                { name: "Strawberry", price: 3.00 },
                { name: "Banana", price: 3.00 }
            ],
            "Ice-Cream": [
                { name: "Vanilla", price: 2.50 },
                { name: "Chocolate", price: 2.50 }
            ]
        }
    }
];

function orderFood() {
    const orderedCategory = document.getElementById('orders').value.trim().toLowerCase();
    const answers = document.getElementById('answers');
    const select = document.getElementById('select');
    const select1 = document.getElementById('select1');

    answers.textContent = '';
    select.innerHTML = ''; 
    select1.innerHTML = ''; 

    const category = Menu.find(cat => cat.category.toLowerCase() === orderedCategory);

    if (category) {
        answers.textContent = `We have ${orderedCategory} menu.`;
        for (const subcategory in category.items) {
            const option = document.createElement('option');
            option.value = subcategory;
            option.textContent = subcategory;
            select.appendChild(option);
        }
    } else {
        answers.textContent = `We do not have ${orderedCategory} in our menu.`;
    }
}

document.getElementById('select').addEventListener('change', function() {
    // e.preventDefault()
    const selectedCategory = this.value;
    const select1 = document.getElementById('select1');
    const answers = document.getElementById('answers');

    select1.innerHTML = '';
    const category = Menu.find(cat => cat.items[selectedCategory]);

    if (category) {
        const items = category.items[selectedCategory];
        items.forEach(item => {
            const option = document.createElement('option');
            option.value = item.name;
            option.textContent = `${item.name} - $${item.price.toFixed(2)}`;
            select1.appendChild(option);
        });
    }
});

function calculatePrice() {
    const selectedItem = document.getElementById('select1').value;
    const totalCostElem = document.getElementById('totalCost');

    let foundItem = null;

    for (const category of Menu) {
        for (const subcategory in category.items) {
            const item = category.items[subcategory].find(i => i.name === selectedItem);
            if (item) {
                foundItem = item;
                break;
            }
        }
        if (foundItem) break;
    }

    if (foundItem) {
        totalCostElem.textContent = `The total cost for ${selectedItem} is $${foundItem.price.toFixed(2)}.`;
    } else {
        totalCostElem.textContent = 'Please select a valid item to calculate the cost.';
    }
}
