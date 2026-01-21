$(window).on('resize', function() {
	const itemBottomY = headerRect.top + headerRect.height - hoverLine.getBoundingClientRect().height;

	document.querySelector('header').addEventListener('mousemove', function(event) {
		// Find the index of the header item over which the cursor is moving
		const currentItemIndex = Array.from(headerItems).findIndex(item => item.getBoundingClientRect().left <= event.clientX && event.clientX <= item.getBoundingClientRect().right);

		if (currentItemIndex !== -1) {
			const currentItem = headerItems[currentItemIndex];
			const itemWidth = currentItem.getBoundingClientRect().width;

			hoverLine.style.top = itemBottomY + 'px';
			hoverLine.style.width = itemWidth + 'px';

			// Set the left coordinate to the current item's left coordinate
			hoverLine.style.left = currentItem.getBoundingClientRect().left + 'px';
		}
	});

	document.querySelector('header').addEventListener('mouseleave', function() {
		hoverLine.style.width = '0';
	});
}).trigger('resize');