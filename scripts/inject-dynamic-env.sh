#!/bin/bash

custom_env_vars='{"HOSTTYPE":"'$HOSTTYPE'","HOSTTYPE":"hosttype","HOSTTYPE":"hosttype"}'
custom_env_vars_anchor='<!--CUSTOM_CONFIG_PLACEHOLDER-->'
index_html_reference=`cat index.html`
index_html=${index_html_reference//$custom_env_vars_anchor/$custom_env_vars}
echo "$index_html" > index2.html
