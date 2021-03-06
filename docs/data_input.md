---
title: Uploading Data to BURRITO for Visualization
layout: default
---
# Uploading Data to BURRITO for Visualization

BURRITO has several options for uploading and viewing datasets. Each data file must be formatted as shown in the examples linked below.

<h2 id="taxonomy">Taxonomic Data</h2>

<h3>Taxonomic abundance table</h3>

The first taxa-function linking method only requires the user to upload a table of taxonomic abundances that uses Greengenes v13.5 (McDonald et al 2012) 97% OTU IDs as produced by QIIME or similar programs. 
The burrito server then uses the PICRUSt (Langille et al, 2013) approach to generate taxonomy-function links and estimated functional profiles. The column of taxon IDs must come as the first column in the table.

<a href="http://elbo-spice.cs.tau.ac.il/shiny/burrito/Data/examples/example_greengenes_otus.txt" target="_blank">Example (With Greengenes OTU IDs) </a>
<!--- <a href="http://elbo-spice.cs.tau.ac.il/shiny/burrito/Data/examples/example_otus.txt" target="_blank">Example </a> -->

<h3>Taxonomic hierarchy</h3>

The user can provide a custom tree describing the hierarchical relationships between taxa (by default the visualization uses the Greengenes taxonomy).
All taxa in the taxonomic abundance table must have a unique row in the corresponding taxonomic hierarchy file.

<a href="http://elbo-spice.cs.tau.ac.il/shiny/burrito/Data/examples/example_tax_hierarchy.txt" target="_blank">Example </a>

<h3>Choosing a summary taxonomic level</h3>

Once finished with all taxonomic data upload options, the user selects a taxonomic hierarchy level to which the data will be summarized. 
If the user chooses the highest level of resolution (e.g. OTU), the visualization will display function attributions down to the level of individual OTUs. 
However, by choosing a lower-resolution level the visualization will load faster, be more responsive, and use less memory.


<h2 id="function">Functional Data</h2>

<h3>Comparison with taxa-independent function abundances</h3>

BURRITO will optionally compare taxa-based estimated functional abundances with a second, paired dataset of measured function abundances (for example, directly annotated and quantified from shotgun metagenomic data). To select this option, the user must upload a data file of function abundances with the first column listing function IDs (KEGG Orthologs (KOs) if using the default functional hierarchy) 
and subsequent columns detailing the abundances of each function in each sample. 

The column names must correspond exactly with the sample names used in other data files.

<a href="http://elbo-spice.cs.tau.ac.il/shiny/burrito/Data/examples/example_metagenome.txt" target="_blank">Example </a>

<h3>Custom genomic content for each taxon</h3>

The second taxa-function linking method allows the user to provide their own genome annotation table for the taxa in their taxonomic abundance table. Using this method, the taxonomic abundance table can use any taxon IDs (they not limited to Greengenes 97% OTU IDs). 

The columns must appear in the same order as in the example. The taxon IDs must match those found in the associated taxonomic abundance table. All taxa must have some information in the genome content file.

<a href="http://elbo-spice.cs.tau.ac.il/shiny/burrito/Data/examples/example_genome_content.txt" target="_blank">Example </a>

<h3>Table of functional attributions for each taxon</h3>

The third taxa-function linking method allows the user to supply their own table of taxon-specific function abundances in the same format as the output generated by using the PICRUSt metagenome_contributions.py script.

The columns must appear in the same order as in the example. The taxon IDs and sample names must appropriately match those found in the taxonomic abundance table.

<a href="http://elbo-spice.cs.tau.ac.il/shiny/burrito/Data/examples/example_contributions.txt" target="_blank">Example </a>


<h3>Functional hierarchy (Pathway assignments)</h3>

The user can provide a custom tree describing the hierarchical relationships between functions (by default the visualization uses the KEGG BRITE hierarchy (Kanehisa and Goto, 2000). This file must be in the same format as the example.

<a href="http://elbo-spice.cs.tau.ac.il/shiny/burrito/Data/examples/example_func_hierarchy.txt" target="_blank">Example </a>

<h3>Choosing a functional summary level</h3>

Once finished with all functional data upload options, the user selects a function hierarchy level to which the data will be summarized. As with the taxonomic summary level, any level can be chosen, but choosing a lower-resolution level may increase performance.

*Warning:* The BRITE hierarchy (used by default) maps single KOs to multiple subpathways. Because BURRITO's tree visualization assumes there are no such many-to-one hierarchical mappings, BURRITO will not display functional data at the KO level under the default settings.
If using a custom hierarchy that maps a higher-resolution function level to multiple lower-resolution levels, the user should select a summary level with exclusively unique mappings. For lower levels, for example for KOs that belong to multiple pathways, BURRITO will assign 
their abundance fractionally to each linked pathway.

<h2 id="samples">Sample Grouping Data</h2>

The user can provide a sample grouping table linking samples to different groupings or factors (e.g. cases vs. controls) in the format shown in the example. Any column of the table can then be selected as the variable used to group and color samples in the visualization. If the 
grouping variable is binary, BURRITO will also perform a basic differential abundance analysis of taxonomic and functional differences between the two groups. See [Exporting Figures and Data from BURRITO](export.html) for more details.

<a href="http://elbo-spice.cs.tau.ac.il/shiny/burrito/Data/examples/example_sample_map.txt" target="_blank">Example </a>

Alternatively, users can select an option to sort samples alphabetically by sample ID.