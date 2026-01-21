const dropdowns = document.querySelectorAll('.dropdown');

for (const dropdown of dropdowns) {
	const dropdownContent = dropdown.querySelector('.dropdown-content');

	dropdownContent.style.display = 'block';
	dropdownContent.style.opacity = '0';
	dropdownContent.style.pointerEvents = 'none';

	dropdown.addEventListener('mouseover', function() {
		dropdownContent.style.opacity = '.9';
		dropdownContent.style.pointerEvents = 'all';
	});

	dropdown.addEventListener('mouseleave', function() {
		dropdownContent.style.opacity = '0';
		dropdownContent.style.pointerEvents = 'none';
	});

	function updateOptions()
	{
		const options = dropdownContent.querySelectorAll('a');
		for (const option of options) {
			option.addEventListener('click', function() {
				dropdownContent.style.opacity = '0';
				dropdownContent.style.pointerEvents = 'none';
			});
		}
	}

	updateOptions();

	const observer = new MutationObserver(updateOptions);
	observer.observe(dropdownContent, { subtree: true, childList: true });
}