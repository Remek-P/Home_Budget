# Home_Budget

This is my first project, created for the final exam (Coders Lab bootcamp).
It is a simple expense tracker meant for mobile devices.

## Technologies used:
* React,
* React Router v6,
* SCSS/CSS
* CRA
* Material UI
* Google Fonts

## Details:
To begin add several expenses, which will be automatically summed in all expenses section and category section. For simplicity, the main overview shows only last month expenses and the percentage difference (M2M).

## Category view:
* Category name button:
  * Sort;
  * Rename - in case of all expenses view, you cannot modify the name;
  * Delete category - in case of all expenses view, you will delete all expenses but not the category.
* Sum-up section shows this month and previous month sum-up, and the %M2M change.
* Expense - upon a simple tap/click, menu unravels, showing:
  * Further details, like the original currency and amount of expense;
  * Edit - allows for editing (prefilled with initial data) expense;
  * Delete button.

## Caveat:
* Currencies are hardcoded and for demo purposes only;
* All expenses are displayed in PLN;
* Editing currency will recalculate the value based on original amount (unless the value input has been modified);

## Shout outs to:
* Jacek Mikrut - the bootcamp tutor,
* Marceli Olszewski - the bootcamp mentor;

## Try it out:
https://glittering-frangollo-e91665.netlify.app/