/**
 * jQuery<element> jQuery.at(x,y)
 * Find the elements under an absolute point
 * @param Number x	horizontal offset from page origin of point
 * @param Number y	vertical offset from page origin of point
 * @return jQuery	jQuery object of the set of elements under the requested point
 * @author Bryan Elliott <http://codemonkeybryan.com/contact/bbx>
 * @see	http://codemonkeybryan.com/jQuery.at
 * @license http://creativecommons.org/licenses/by-sa/3.0/
 **/
(function ($, document, $window, elementFromPoint, scrollLeft, scrollTop) {
	var	checked = false,
		$document = $(document),
		browserIsRelative = true,
		getElementFromPoint = function (x, y) {
			if (!document[elementFromPoint]) return [];
			var scroll;
			if (!checked) {
				if ((scroll = $document[scrollTop]()) > 0) {
					browserIsRelative = (document[elementFromPoint](0, scroll + $window.height() - 1) == null);
				} else if ((s = $document[scrollLeft]()) > 0) {
					browserIsRelative = (document[elementFromPoint](scroll + $window.width() - 1, 0) == null);
				}
				checked = (s > 0);
			}
			if (!browserIsRelative) {
				x += $document[scrollLeft]();
				y += $document[scrollTop]();
			}
			return document[elementFromPoint](x, y);
		};
	$.at = function at(x, y, selector) {
		var 
			element = getElementFromPoint(x, y), 
			returnValue = [element],
			display = element.style.visibility;
		if (element == document.body || element == document.documentElement)  return $([]);
		element.style.visibility='hidden';
		returnValue = $(returnValue.concat($.makeArray($.at(x, y))));
		element.style.visibility=display;
		if (selector) returnValue=returnValue.filter(selector);
		return returnValue;
	};
})(jQuery, document, jQuery(window), 'elementFromPoint', 'scrollLeft', 'scrollTop');
